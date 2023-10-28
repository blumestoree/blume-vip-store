import UserRepository from '../../../infrastructure/user/repositories/user.repository';
import ForgotPasswordUseCase from './forgotPassword.user.usecase';
import SendEmail from './transportEmail/sendEmail';

export default class ForgotPasswordUserUsecaseFactory {
  static create() {
    return new ForgotPasswordUseCase(new UserRepository(), new SendEmail());
  }
}
