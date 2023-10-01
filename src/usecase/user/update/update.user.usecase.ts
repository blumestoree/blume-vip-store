import UserRepositoryInterface from '../../../domain/user/repositories/user.repository';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputUpdateUserDto, OutputCreateUserDto } from './update.user.dto';

export default class UpdateUserUseCase
  implements UseCaseInterface<InputUpdateUserDto, OutputCreateUserDto>
{
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(input: InputUpdateUserDto): Promise<OutputCreateUserDto> {
    const user = await this.userRepository.find(input.userId);
    user.changeName(input.name);

    await this.userRepository.update(user);

    return {
      userId: user.userId,
      name: user.name,
      email: user.email,
    };
  }
}
