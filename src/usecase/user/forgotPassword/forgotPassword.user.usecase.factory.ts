import UserRepository from '../../../infrastructure/user/repositories/user.repository';
import ForgotPasswordUseCase from './forgotPassword.user.usecase';
import SendEmail from '../../../infrastructure/user/transportEmail/sendEmail';

export default class ForgotPasswordUserUsecaseFactory {
  static create() {
    return new ForgotPasswordUseCase(new UserRepository(), new SendEmail());
  }
}
