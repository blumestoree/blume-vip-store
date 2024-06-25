import { PrismaClient } from '@prisma/client';
import ServerOwnerRepositoryInterface from '../../../domain/serverOwner/repositories/serverOwner.repository.interface';
import ServerOwner from '../../../domain/serverOwner/entity/serverOwner.entity';
import ServerOwnerFactory from '../../../domain/serverOwner/factory/serverOwner.factory';

export default class ServerOwnerRepository implements ServerOwnerRepositoryInterface {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(entity: ServerOwner): Promise<void> {
    await this.prisma.serverOwner.create({
      data: {
        serverOwnerId: entity.id,
        name: entity.name,
        email: entity.email,
        password: entity.password,
        server: {
          create: []
        },
      },
    });
  }

  async update(entity: ServerOwner): Promise<void> {
    await this.prisma.serverOwner.update({
      where: { serverOwnerId: entity.id },
      data: {
        serverOwnerId: entity.id,
        name: entity.name,
        email: entity.email,
        password: entity.password,
      },
    });
  }

  async findAll(): Promise<ServerOwner[]> {
    const serverOwners = await this.prisma.serverOwner.findMany({
      include: {
        server: true,
      },
    });

    return serverOwners.map((serverOwner) => {
      return ServerOwnerFactory.create(
        serverOwner.name,
        serverOwner.email,
        serverOwner.password,
        serverOwner.serverOwnerId,
        serverOwner.serverId?.serverId,
      );
    });
  }

  async find(serverOwnerId: string): Promise<ServerOwner> {
    let serverOwner;

    try {
      serverOwner = await this.prisma.serverOwner.findUniqueOrThrow({
        where: { serverOwnerId },
        include: {
          server: true,
        },
      });
    } catch (error) {
      throw new Error('ServerOwner not found');
    }

    return ServerOwnerFactory.create(
      serverOwner.name,
      serverOwner.email,
      serverOwner.password,
      serverOwner.serverOwnerId,
      serverOwner.server.map((server) => server.serverId),
    );
  }
}
