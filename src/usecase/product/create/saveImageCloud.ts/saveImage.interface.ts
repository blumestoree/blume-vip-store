export default interface SaveImageCloudInterface {
  sendImage(image: string): Promise<void>;
}
