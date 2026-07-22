/**
 * Storage routes — presigned upload URLs + object serving.
 * Upload endpoint protected by adminGuard (HMAC cookie).
 * Serve endpoint is public (product images are public assets).
 */
import { Readable } from 'stream';
import { Router, type IRouter, type Request, type Response } from 'express';
import { ObjectNotFoundError, ObjectStorageService } from '../lib/objectStorage';
import { adminGuard } from '../middleware/adminAuth';
import { logger } from '../lib/logger';

const router: IRouter = Router();
const storage = new ObjectStorageService();

/**
 * POST /api/storage/uploads/request-url
 * Admin only — generates a presigned PUT URL for direct-to-GCS upload.
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

  try {
    const uploadURL = await storage.getObjectEntityUploadURL();
    const objectPath = storage.normalizeObjectEntityPath(uploadURL);
    res.json({ uploadURL, objectPath, metadata: { name, size, contentType } });
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
    const raw = req.params.filePath;
    const filePath = Array.isArray(raw) ? raw.join('/') : raw;
    const file = await storage.searchPublicObject(filePath);
    if (!file) { res.status(404).json({ error: 'File not found' }); return; }

    const response = await storage.downloadObject(file);
    res.status(response.status);
    response.headers.forEach((value, key) => res.setHeader(key, value));
    if (response.body) {
      Readable.fromWeb(response.body as ReadableStream<Uint8Array>).pipe(res);
    } else { res.end(); }
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
    const raw = req.params.path;
    const wildcardPath = Array.isArray(raw) ? raw.join('/') : raw;
    const objectPath = `/objects/${wildcardPath}`;
    const file = await storage.getObjectEntityFile(objectPath);

    const response = await storage.downloadObject(file);
    res.status(response.status);
    response.headers.forEach((value, key) => res.setHeader(key, value));
    if (response.body) {
      Readable.fromWeb(response.body as ReadableStream<Uint8Array>).pipe(res);
    } else { res.end(); }
  } catch (err) {
    if (err instanceof ObjectNotFoundError) {
      res.status(404).json({ error: 'Object not found' });
      return;
    }
    logger.error({ err }, 'Error serving object');
    res.status(500).json({ error: 'Failed to serve object' });
  }
});

export default router;
