import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import UploadImageInterface from './product.uploadImage.interface';
import path from 'path';
import fs from 'fs';

export default class SaveImageCloud implements UploadImageInterface {
  s3Client = new S3Client({
    region: process.env.AWS_DEFAULT_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESSKEY as string,
      secretAccessKey: process.env.AWS_SECRETKEY as string,
    },
  });

  async sendImage(image: string): Promise<void> {
    try {
      const originalPath = path.resolve(__dirname, '..', '..', '..', '..', 'tpm', image);
      const fileContent = await fs.promises.readFile(originalPath);

      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKETNAME,
          Key: `products/${image}`,
          Body: fileContent,
          ACL: 'public-read',
          ContentType: 'image/png',
        }),
      );

      await fs.promises.unlink(originalPath);
    } catch (error) {
      throw new Error('Error when upload image');
    }
  }

  async deleteImage(image: string): Promise<void> {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKETNAME,
          Key: `products/${image}`,
        }),
      );
    } catch (error) {
      throw new Error('Error when delete image');
    }
  }
}
