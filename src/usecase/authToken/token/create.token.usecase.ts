import jwt, { JwtPayload } from 'jsonwebtoken';
import AuthInterface from '../../../shared/auth.interface';
import dayjs from 'dayjs';
import AuthTokenRepository from '../../../infrastructure/authToken/repositories/authToken.repository';

export default class UserAuthTokenUsecase implements AuthInterface<JwtPayload> {
  constructor(private authTokenRepository: AuthTokenRepository) {}

  createToken(text: string): string {
    return jwt.sign({ data: text }, process.env.JWT_TOKEN as string, { expiresIn: '20s' });
  }

  verifyToken(token: string): JwtPayload {
    return jwt.verify(token, process.env.JWT_TOKEN as string) as JwtPayload;
  }

  async createRefreshToken(userId: string): Promise<{ id: string; expiresIn: number }> {
    const refreshToken = await this.authTokenRepository.create(userId);
    return {
      id: refreshToken.id,
      expiresIn: refreshToken.expiresIn,
      // userId: refreshToken.userId,
    };
  }

  async verifyRefreshToken(refreshToken: string): Promise<string> {
    const teste = await this.authTokenRepository.find(refreshToken);

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(teste.expiresIn));

    if (refreshTokenExpired) {
      await this.authTokenRepository.delete(teste.userId);
      throw new Error('Refresh token expired');
    }

    const newToken = this.createToken(teste.userId);

    return newToken;
  }
}
