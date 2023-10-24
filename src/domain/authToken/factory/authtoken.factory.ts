import AuthToken from '../entity/authToken.entity';

export default class AuthTokenFactory {
  static create(id: string, expiresIn: number, userId: string): AuthToken {
    return new AuthToken(id, expiresIn, userId);
  }
}
