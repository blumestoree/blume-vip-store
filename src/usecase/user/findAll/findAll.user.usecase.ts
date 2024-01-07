import UserRepositoryInterface from '../../../domain/user/repositories/user.repository';
import UseCaseInterface from '../../../shared/usecase.interface';
import { OutputFindAllUserDto } from './findAll.user.dto';

export default class FindAllUserUseCase
  implements UseCaseInterface<undefined, OutputFindAllUserDto[]>
{
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(): Promise<OutputFindAllUserDto[]> {
    const allUsers = await this.userRepository.findAll();
    return allUsers.map((user) => {
      return {
        id: user.id,
        name: user.name,
        gameUserId: user.gameUserId,
        email: user.email,
      };
    });
  }
}
