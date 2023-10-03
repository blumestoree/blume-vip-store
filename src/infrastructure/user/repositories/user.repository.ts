import { PrismaClient } from '@prisma/client';
import UserRepositoryInterface from '../../../domain/user/repositories/user.repository';
import User from '../../../domain/user/entity/user.entity';
import UserFactory from '../../../domain/user/factory/user.factory';

export default class UserRepository implements UserRepositoryInterface {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(entity: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        userId: entity.id,
        name: entity.name,
        email: entity.email,
        password: entity.password,
      },
    });
  }

  async update(entity: User): Promise<void> {
    await this.prisma.user.update({
      where: { userId: entity.id },
      data: {
        userId: entity.id,
        name: entity.name,
        email: entity.email,
        password: entity.password,
      },
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => {
      return UserFactory.create(user.name, user.email, user.password, user.userId);
    });
  }

  async find(userId: string): Promise<User> {
    let user;

    try {
      user = await this.prisma.user.findUniqueOrThrow({
        where: { userId },
      });
    } catch (error) {
      throw new Error('User not found');
    }

    return UserFactory.create(user.name, user.email, user.password, user.userId);
  }
}
