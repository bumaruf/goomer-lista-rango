import fs from 'fs';
import mime from 'mime';
import path from 'path';

import { upload } from '@configs/upload';
import { AppError } from '@core/errors/AppError';

import { StorageProvider as StorageProviderInterface } from '@interfaces/storageProvider.interface';

export class StorageProvider implements StorageProviderInterface {
  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(upload.tmpFolder, file);

    const fileType = mime.getType(originalPath);

    if (!fileType) {
      await fs.promises.unlink(originalPath);
      throw new AppError('Invalid photo format');
    }

    await fs.promises.rename(
      path.resolve(upload.tmpFolder, file),
      path.resolve(upload.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(upload.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
