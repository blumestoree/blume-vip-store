import UserRepositoryInterface from '../../../domain/user/repositories/user.repository';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputForgotPasswordUserDto } from './forgotPassword.user.dto';
import SendEmailInterface from '../../../infrastructure/user/transportEmail/sendEmail.interface';

export default class ForgotPasswordUseCase
  implements UseCaseInterface<InputForgotPasswordUserDto, void>
{
  constructor(
    private userRepository: UserRepositoryInterface,
    private sendEmail: SendEmailInterface,
  ) {}

  async execute(input: InputForgotPasswordUserDto): Promise<void> {
    await this.userRepository.findUserByEmail(input.email);
    this.sendEmail.sendEmail(input.email);
  }
}
