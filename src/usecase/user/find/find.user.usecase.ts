import UserRepositoryInterface from '../../../domain/user/repositories/user.repository';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputFindUserDto, OutputFindUserDto } from './find.user.dto';

export default class FindUserUseCase
  implements UseCaseInterface<InputFindUserDto, OutputFindUserDto>
{
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(input: InputFindUserDto): Promise<OutputFindUserDto> {
    const server = await this.userRepository.find(input.id);
    return {
      id: server.id,
      name: server.name,
      email: server.email,
    };
  }
}
