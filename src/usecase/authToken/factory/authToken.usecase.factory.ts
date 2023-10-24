import { JwtPayload } from 'jsonwebtoken';
import AuthTokenRepository from '../../../infrastructure/authToken/repositories/authToken.repository';
import AuthTokenInterface from '../../../domain/authToken/repositories/authToken.interface';
import UserAuthTokenUsecase from '../token/token.usecase';

export default class AuthTokenUsecaseFactory {
  static create(): AuthTokenInterface<JwtPayload> {
    return new UserAuthTokenUsecase(new AuthTokenRepository());
  }
}
