import nodemailer from 'nodemailer';
import SendEmailInterface from './sendEmail.interface';
import randomBytes from 'randombytes';
import { env } from '../../../app/env';

export default class SendEmail implements SendEmailInterface {
  async sendEmail(email: string) {
    try {
      const transporter = nodemailer.createTransport({
        host: env.EMAIL_HOST,
        port: 2525,
        auth: {
          user: env.EMAIL_USER,
          pass: env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `Administrador <${env.EMAIL_HOST}>`,
        to: email,
        subject: 'Recuperação de Senha!',
        text: `Olá, alguém tentou entrar na sua conta, se foi você, use o seguinte código para confirmar sua identidade ${randomBytes(
          3,
        ).toString('hex')}`,
      });
    } catch (error) {
      throw new Error('Fail to send email');
    }
  }
}
