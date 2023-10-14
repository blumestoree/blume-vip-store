import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import AuthToken from '../../../usecase/authToken/entity/authToken.entity';

export default class AuthTokenRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(userId: string): Promise<AuthToken> {
    const expiresIn = dayjs().add(5, 'second').unix();

    const token = await this.prisma.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });

    return new AuthToken(token.id, token.expiresIn, token.userId);
  }

  async delete(userId: string): Promise<void> {
    await this.prisma.refreshToken.delete({
      where: { userId },
    });
  }

  async find(refreshTokenId: string): Promise<AuthToken> {
    let token;

    try {
      token = await this.prisma.refreshToken.findUniqueOrThrow({
        where: { id: refreshTokenId },
      });
    } catch (error) {
      throw new Error('Refresh token invalid');
    }

    return new AuthToken(token.id, token.expiresIn, token.userId);
  }
}
