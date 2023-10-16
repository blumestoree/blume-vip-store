import { JwtPayload } from 'jsonwebtoken';
import AuthTokenRepository from '../../../infrastructure/authToken/repositories/authToken.repository';
import AuthInterface from '../repositories/authToken.interface';
import UserAuthTokenUsecase from '../token/token.usecase';

export default class AuthTokenFactory {
  static create(): AuthInterface<JwtPayload> {
    return new UserAuthTokenUsecase(new AuthTokenRepository());
  }
}
