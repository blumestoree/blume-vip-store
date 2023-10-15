import jwt, { JwtPayload } from 'jsonwebtoken';
import AuthInterface from '../../../shared/auth.interface';
import dayjs from 'dayjs';
import AuthTokenRepository from '../../../infrastructure/authToken/repositories/authToken.repository';

export default class UserAuthTokenUsecase implements AuthInterface<JwtPayload> {
  constructor(private authTokenRepository: AuthTokenRepository) {}

  createToken(text: string): string {
    return jwt.sign({ data: text }, process.env.JWT_TOKEN as string, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
  }

  verifyToken(token: string): JwtPayload {
    return jwt.verify(token, process.env.JWT_TOKEN as string) as JwtPayload;
  }

  async updateRefreshToken(userId: string): Promise<{ id: string; expiresIn: number }> {
    const existingRefreshToken = await this.authTokenRepository.findByUser(userId);
    if (existingRefreshToken) {
      await this.authTokenRepository.delete(existingRefreshToken.userId);
    }
    const refreshTokenInfo = await this.createRefreshToken(userId);

    return refreshTokenInfo;
  }

  async createRefreshToken(userId: string): Promise<{ id: string; expiresIn: number }> {
    const refreshToken = await this.authTokenRepository.create(userId);
    return {
      id: refreshToken.id,
      expiresIn: refreshToken.expiresIn,
    };
  }

  async verifyRefreshToken(refreshToken: string): Promise<string> {
    const token = await this.authTokenRepository.find(refreshToken);

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(token.expiresIn));

    if (refreshTokenExpired) {
      await this.authTokenRepository.delete(token.userId);
      throw new Error('Refresh token expired');
    }

    const newToken = this.createToken(token.userId);

    return newToken;
  }
}
