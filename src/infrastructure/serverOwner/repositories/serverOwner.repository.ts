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
        serverId: entity.serverId,
      },
    });
  }

  async findAll(): Promise<ServerOwner[]> {
    const owners = await this.prisma.serverOwner.findMany();
    return owners.map((owner) => {
      return new ServerOwner(owner.serverOwnerId, owner.name, owner.email, owner.password);
    });
  }

  async find(serverOwnerId: string): Promise<ServerOwner> {
    let owner;

    try {
      owner = await this.prisma.serverOwner.findUniqueOrThrow({
        where: { serverOwnerId },
      });
    } catch (error) {
      throw new Error('Owner not found');
    }

    return new ServerOwner(owner.serverOwnerId, owner.name, owner.email, owner.password);
  }
}
