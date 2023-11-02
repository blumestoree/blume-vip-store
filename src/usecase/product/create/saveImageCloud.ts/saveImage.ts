import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import SaveImageCloudInterface from './saveImage.interface';

export default class SaveImageCloud implements SaveImageCloudInterface {
  async sendImage(image: string): Promise<void> {
    try {
      const s3Client = new S3Client({
        region: process.env.AWS_BUCKETNAME as string,
        credentials: {
          accessKeyId: process.env.AWS_ACCESSKEY as string,
          secretAccessKey: process.env.AWS_SECRETKEY as string,
        },
      });

      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKETNAME as string,
          Key: image,
          Body: 'Hello world',
          ContentType: 'image/jpg',
        }),
      );
      console.log('teste');
    } catch (error) {
      console.log(error);
    }
  }
}
