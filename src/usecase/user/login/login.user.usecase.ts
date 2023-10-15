import UserFactory from '../../../domain/user/factory/user.factory';
import UserAuthTokenUsecase from '../../authToken/token/token.usecase';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputLoginUserDto, OutputLoginUserDto } from './login.user.dto';
import AuthTokenRepository from '../../../infrastructure/authToken/repositories/authToken.repository';
import UserOwnerCrypter from '../../../domain/user/crypter/user.crypter';
import UserRepositoryInterface from '../../../domain/user/repositories/user.repository';

export default class LoginUserUseCase
  implements UseCaseInterface<InputLoginUserDto, OutputLoginUserDto>
{
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(input: InputLoginUserDto): Promise<OutputLoginUserDto> {
    const findUser = await this.userRepository.findUserByEmail(input.email);

    if (!findUser) {
      throw new Error('User not found');
    }

    const user = UserFactory.create(findUser.name, findUser.email, input.password, findUser.id);
    if (!new UserOwnerCrypter().compare(input.password, user.password)) {
      //verify password
      throw new Error('Wrong password');
    }
    const token = new UserAuthTokenUsecase(new AuthTokenRepository()).createToken(user.name);
    const refreshToken = await new UserAuthTokenUsecase(new AuthTokenRepository()).updateToken(
      user.id,
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
      refreshToken,
    };
  }
}
