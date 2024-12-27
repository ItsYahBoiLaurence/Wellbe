import { Inject, Injectable } from '@nestjs/common';
import { LoggerService } from '@x/logging';
import { S3 } from 'aws-sdk';
import { Blob } from 'buffer';
import * as crypto from 'crypto';
import { STORAGE_CONFIG_OPTIONS } from './constants';
import { StorageConfigOptions } from './storage-config-options';

@Injectable()
export class StorageService {
  constructor(
    @Inject(STORAGE_CONFIG_OPTIONS)
    private config: StorageConfigOptions,
    private logger: LoggerService
  ) {}

  async upload(
    blob: Blob,
    directory: string,
    fileName: string
  ): Promise<string> {
    try {
      const s3 = new S3({
        accessKeyId: this.config.accessKeyId,
        secretAccessKey: this.config.secretAccessKey,
        region: this.config.region,
      });
      const keyDirectory = directory || crypto.randomBytes(32).toString('hex');
      const keyFileName = fileName || crypto.randomBytes(32).toString('hex');
      const uploadedImage = await s3
        .upload({
          Bucket: this.config.bucketName,
          Key: `${keyDirectory}/${keyFileName}`,
          Body: blob,
        })
        .promise();

      return uploadedImage.Location;
    } catch (error) {
      this.logger.error('StorageService.upload | Failed to upload file', error);
      return null;
    }
  }
}
