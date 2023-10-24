import { PrismaClient } from '@prisma/client';
import AuthToken from '../../../domain/authToken/entity/authToken.entity';
import AuthTokenFactory from '../../../domain/authToken/factory/authtoken.factory';
import AuthTokenRepositoryInterface from '../../../domain/authToken/repositories/authToken.repository.interface';

export default class AuthTokenRepository implements AuthTokenRepositoryInterface<AuthToken> {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(userId: string, expiresIn: number): Promise<AuthToken> {
    const token = await this.prisma.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });

    return AuthTokenFactory.create(token.id, token.expiresIn, token.userId);
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

    return AuthTokenFactory.create(token.id, token.expiresIn, token.userId);
  }

  async findByUser(userId: string): Promise<AuthToken> {
    let token;

    try {
      token = await this.prisma.refreshToken.findUniqueOrThrow({
        where: { userId },
      });
    } catch (error) {
      throw new Error('Token not found');
    }

    return AuthTokenFactory.create(token.id, token.expiresIn, token.userId);
  }
}
