import UserFactory from '../../../domain/user/factory/user.factory';
import UserRepositoryInterface from '../../../domain/user/repositories/user.repository';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputCreateUserDto, OutputCreateUserDto } from './create.user.dto';

export default class CreateUserUseCase
  implements UseCaseInterface<InputCreateUserDto, OutputCreateUserDto>
{
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(input: InputCreateUserDto): Promise<OutputCreateUserDto> {
    const server = UserFactory.create(input.name, input.email, input.password);
    await this.userRepository.create(server);

    return {
      id: server.id,
      name: server.name,
      email: server.email,
    };
  }
}
