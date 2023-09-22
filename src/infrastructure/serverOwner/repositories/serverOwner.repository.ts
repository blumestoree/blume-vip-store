import { PrismaClient } from '@prisma/client';
import ServerOwnerRepositoryInterface from '../../../domain/serverOwner/repositories/serverOwner.repository.interface';
import ServerOwner from '../../../domain/serverOwner/entity/serverOwner.entity';

export default class ServerOwnerRepository implements ServerOwnerRepositoryInterface {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(entity: ServerOwner): Promise<void> {
    await this.prisma.serverOwner.create({
      data: {
        serverOwnerId: entity.serverOwnerId,
        name: entity.name,
        email: entity.email,
        password: entity.password,
      },
    });
  }

  async update(entity: ServerOwner): Promise<void> {
    await this.prisma.serverOwner.update({
      where: {
        serverOwnerId: entity.serverOwnerId,
      },
      data: {
        name: entity.name,
        email: entity.email,
        password: entity.password,
      },
    });
  }

  async findAll(): Promise<ServerOwner[]> {
    const owners = await this.prisma.serverOwner.findMany({
      include: {
        serverId: true,
      },
    });

    return owners.map((owner) => {
      const serverOwner = new ServerOwner(
        owner.serverOwnerId,
        owner.name,
        owner.email,
        owner.password,
      );

      if (owner.serverId !== null) {
        serverOwner.changeServer(owner.serverId?.id);
      }

      return serverOwner;
    });
  }

  async find(serverOwnerId: string): Promise<ServerOwner> {
    let owner;

    try {
      owner = await this.prisma.serverOwner.findUniqueOrThrow({
        where: { serverOwnerId },
        include: {
          serverId: true,
        },
      });
    } catch (error) {
      throw new Error('ServerOwner not found');
    }

    const serverOwner = new ServerOwner(
      owner.serverOwnerId,
      owner.name,
      owner.email,
      owner.password,
    );

    if (owner.serverId !== null) {
      serverOwner.changeServer(owner.serverId?.id);
    }

    return serverOwner;
  }
}
