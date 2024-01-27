import UserFactory from '../../../domain/user/factory/user.factory';
import UserRepositoryInterface from '../../../domain/user/repositories/user.repository';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputCreateUserDto, OutputCreateUserDto } from './create.user.dto';
import AuthTokenUsecaseFactory from '../../authToken/factory/authToken.usecase.factory';

export default class CreateUserUseCase
  implements UseCaseInterface<InputCreateUserDto, OutputCreateUserDto>
{
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(input: InputCreateUserDto): Promise<OutputCreateUserDto> {
    const user = UserFactory.create(input.name, input.gameUserId, input.email, input.password);
    user.encryptPassword(input.password);
    await this.userRepository.create(user);

    const token = AuthTokenUsecaseFactory.create().createToken(user.name);
    const refreshToken = await AuthTokenUsecaseFactory.create().createRefreshToken(user.id);

    return {
      id: user.id,
      name: user.name,
      gameUserId: user.gameUserId,
      email: user.email,
      token,
      refreshToken,
    };
  }
}
