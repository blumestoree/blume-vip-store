export default interface UploadImageInterface {
  sendImage(image: string): Promise<void>;
  deleteImage(image: string): Promise<void>;
}
