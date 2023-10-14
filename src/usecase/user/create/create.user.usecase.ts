import UserFactory from '../../../domain/user/factory/user.factory';
import UserRepositoryInterface from '../../../domain/user/repositories/user.repository';
import UserAuthTokenUsecase from '../../authToken/token/create.token.usecase';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputCreateUserDto, OutputCreateUserDto } from './create.user.dto';
import AuthTokenRepository from '../../../infrastructure/authToken/repositories/authToken.repository';

export default class CreateUserUseCase
  implements UseCaseInterface<InputCreateUserDto, OutputCreateUserDto>
{
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(input: InputCreateUserDto): Promise<OutputCreateUserDto> {
    const user = UserFactory.create(input.name, input.email, input.password);
    await this.userRepository.create(user);
    const token = new UserAuthTokenUsecase(new AuthTokenRepository()).createToken(user.name);
    const refreshToken = await new UserAuthTokenUsecase(
      new AuthTokenRepository(),
    ).createRefreshToken(user.id);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
      refreshToken,
    };
  }
}
