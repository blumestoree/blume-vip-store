import UserFactory from '../../../domain/user/factory/user.factory';
import UserRepositoryInterface from '../../../domain/user/repositories/user.repository';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputCreateUserDto, OutputCreateUserDto } from './create.user.dto';
import AuthTokenFactory from '../../authToken/factory/authtoken.factory';

export default class CreateUserUseCase
  implements UseCaseInterface<InputCreateUserDto, OutputCreateUserDto>
{
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(input: InputCreateUserDto): Promise<OutputCreateUserDto> {
    const user = UserFactory.create(input.name, input.email, input.password);
    await this.userRepository.create(user);

    const token = AuthTokenFactory.create().createToken(user.name);
    const refreshToken = await AuthTokenFactory.create().createRefreshToken(user.id);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
      refreshToken,
    };
  }
}
