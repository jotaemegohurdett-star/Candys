/**
 * Storage routes — presigned upload URLs + object serving.
 * Upload endpoint protected by adminGuard (HMAC cookie).
 * Serve endpoint is public (product images are public assets).
 */
import express from 'express';
import { Router, type IRouter, type Request, type Response } from 'express';
import { ObjectStorageService } from '../lib/objectStorage';
import { adminGuard } from '../middleware/adminAuth';
import { logger } from '../lib/logger';

const router: IRouter = Router();
const storage = new ObjectStorageService();

/**
 * PUT /api/storage/uploads/direct
 * Vercel Blob upload target. The admin cookie protects the direct upload.
 */
router.put(
  '/storage/uploads/direct',
  adminGuard,
  express.raw({ type: '*/*', limit: '10mb' }),
  async (req: Request, res: Response) => {
    if (!storage.usesVercelBlob()) {
      res.status(503).json({ error: 'Vercel Blob is not configured' });
      return;
    }

    const objectPath = typeof req.query.path === 'string' ? req.query.path : '';
    if (!objectPath.startsWith('/objects/uploads/')) {
      res.status(400).json({ error: 'Invalid upload path' });
      return;
    }

    try {
      const body = Buffer.isBuffer(req.body) ? req.body : Buffer.from(req.body ?? '');
      const result = await storage.uploadVercelObject(
        objectPath,
        body,
        req.get('content-type') || 'application/octet-stream',
      );
      res.json(result);
    } catch (err) {
      logger.error({ err }, 'Error uploading object to Vercel Blob');
      res.status(500).json({ error: 'Failed to upload object' });
    }
  },
);

/**
 * POST /api/storage/uploads/request-url
 * Admin only — generates a server-proxied upload URL for Vercel Blob.
 * Client sends metadata (NOT the file). File is PUT directly to the returned URL.
 */
router.post('/storage/uploads/request-url', adminGuard, async (req: Request, res: Response) => {
  const { name, size, contentType } = req.body as {
    name?: string; size?: number; contentType?: string;
  };
  if (!name || typeof size !== 'number' || !contentType) {
    res.status(400).json({ error: 'Missing or invalid fields: name, size, contentType required' });
    return;
  }

  if (!storage.usesVercelBlob()) {
    res.status(503).json({ error: 'Vercel Blob is not configured' });
    return;
  }

  try {
    const objectPath = storage.createVercelObjectPath();
    res.json({
      uploadURL: `/api/storage/uploads/direct?path=${encodeURIComponent(objectPath)}`,
      objectPath,
      metadata: { name, size, contentType },
    });
  } catch (err) {
    logger.error({ err }, 'Error generating upload URL');
    res.status(500).json({ error: 'Failed to generate upload URL' });
  }
});

/**
 * GET /api/storage/public-objects/*
 * Unconditionally public — for assets uploaded via Storage pane.
 */
router.get('/storage/public-objects/*filePath', async (req: Request, res: Response) => {
  try {
    if (!storage.usesVercelBlob()) {
      res.status(503).json({ error: 'Vercel Blob is not configured' });
      return;
    }

    const raw = req.params.filePath;
    const filePath = Array.isArray(raw) ? raw.join('/') : raw;
    const url = await storage.getVercelObjectUrl(`/public-objects/${filePath}`);
    if (!url) { res.status(404).json({ error: 'File not found' }); return; }
    res.redirect(302, url);
  } catch (err) {
    logger.error({ err }, 'Error serving public object');
    res.status(500).json({ error: 'Failed to serve object' });
  }
});

/**
 * GET /api/storage/objects/*
 * Serves uploaded product images — public read (no auth needed for display).
 */
router.get('/storage/objects/*path', async (req: Request, res: Response) => {
  try {
    if (!storage.usesVercelBlob()) {
      res.status(503).json({ error: 'Vercel Blob is not configured' });
      return;
    }

    const raw = req.params.path;
    const wildcardPath = Array.isArray(raw) ? raw.join('/') : raw;
    const objectPath = `/objects/${wildcardPath}`;
    const url = await storage.getVercelObjectUrl(objectPath);
    if (!url) { res.status(404).json({ error: 'Object not found' }); return; }
    res.redirect(302, url);
  } catch (err) {
    logger.error({ err }, 'Error serving object');
    res.status(500).json({ error: 'Failed to serve object' });
  }
});

export default router;
