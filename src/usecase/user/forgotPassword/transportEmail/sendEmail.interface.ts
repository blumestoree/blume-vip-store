export default interface SendEmailInterface {
  sendEmail(email: string): Promise<void>;
}
