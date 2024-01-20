import jwt, { JwtPayload } from 'jsonwebtoken';
import dayjs from 'dayjs';
import AuthTokenInterface from '../../../domain/authToken/repositories/authToken.interface';
import AuthToken from '../../../domain/authToken/entity/authToken.entity';
import AuthTokenRepositoryInterface from '../../../domain/authToken/repositories/authToken.repository.interface';
import { env } from '../../../app/env';

export default class UserAuthTokenUsecase implements AuthTokenInterface<JwtPayload> {
  constructor(private authTokenRepository: AuthTokenRepositoryInterface<AuthToken>) {}

  createToken(text: string): string {
    return jwt.sign({ data: text }, env.JWT_TOKEN as string, {
      expiresIn: env.TOKEN_EXPIRE_TIME,
    });
  }

  verifyToken(token: string): JwtPayload {
    return jwt.verify(token, env.JWT_TOKEN as string) as JwtPayload;
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
    const refreshTokenExpireMinutes = env.REFRESH_TOKEN_EXPIRE_TIME_MINUTES as string;
    const expiresIn = dayjs()
      .add(+refreshTokenExpireMinutes || 5, 'minutes')
      .unix();
    const refreshToken = await this.authTokenRepository.create(userId, expiresIn);
    return {
      id: refreshToken.id,
      expiresIn: refreshToken.expiresIn,
    };
  }

  async verifyRefreshToken(refreshToken: string): Promise<string> {
    const token = await this.authTokenRepository.find(refreshToken);

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(token.expiresIn));

    if (refreshTokenExpired) {
      throw new Error('Refresh token expired');
    }

    const newToken = this.createToken(token.userId);

    return newToken;
  }
}
