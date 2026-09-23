import { randomUUID } from 'crypto';
import { list, put } from '@vercel/blob';

export class ObjectStorageService {
  constructor() {}

  usesVercelBlob(): boolean {
    return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
  }

  createVercelObjectPath(): string {
    return `/objects/uploads/${randomUUID()}`;
  }

  async uploadVercelObject(
    objectPath: string,
    body: Buffer,
    contentType: string,
  ): Promise<{ url: string; pathname: string }> {
    if (!this.usesVercelBlob()) {
      throw new Error('Vercel Blob is not configured');
    }

    const blob = await put(objectPath.replace(/^\/+/, ''), body, {
      access: 'public',
      addRandomSuffix: false,
      contentType,
    });
    return { url: blob.url, pathname: blob.pathname };
  }

  async getVercelObjectUrl(objectPath: string): Promise<string | null> {
    if (!this.usesVercelBlob()) {
      return null;
    }

    const pathname = objectPath.replace(/^\/+/, '');
    const result = await list({ prefix: pathname, limit: 100 });
    const blob = result.blobs.find((item) => item.pathname === pathname);
    return blob?.url ?? null;
  }
}
