import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import SaveImageCloudInterface from './saveImage.interface';
import path from 'path';
import fs from 'fs';

export default class SaveImageCloud implements SaveImageCloudInterface {
  async sendImage(image: string): Promise<void> {
    try {
      const originalPath = path.resolve(__dirname, '..', '..', '..', '..', '..', 'tpm', image);
      const fileContent = await fs.promises.readFile(originalPath);

      const s3Client = new S3Client({
        region: process.env.AWS_DEFAULT_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESSKEY as string,
          secretAccessKey: process.env.AWS_SECRETKEY as string,
        },
      });

      await s3Client.send(
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
      console.log(error);
    }
  }
}
