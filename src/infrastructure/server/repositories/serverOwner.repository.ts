import { PrismaClient } from '@prisma/client';
import ServerRepositoryInterface from '../../../domain/server/repositories/server.repository.interface';
import Server from '../../../domain/server/entity/server.entity';

export default class ServerRepository implements ServerRepositoryInterface {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(entity: Server): Promise<void> {
    await this.prisma.server.create({
      data: {
        serverId: entity.serverId,
        name: entity.name,
      },
    });
  }

  async update(entity: Server): Promise<void> {
    await this.prisma.server.update({
      where: {
        serverId: entity.serverId,
      },
      data: {
        name: entity.name,
        serverId: entity.serverId,
      },
    });
  }

  async findAll(): Promise<Server[]> {
    const owners = await this.prisma.server.findMany();
    return owners.map((owner) => {
      return new Server(owner.serverId, owner.name);
    });
  }

  async find(serverId: string): Promise<Server> {
    let owner;

    try {
      owner = await this.prisma.server.findUniqueOrThrow({
        where: { serverId },
      });
    } catch (error) {
      throw new Error('Owner not found');
    }

    return new Server(owner.serverId, owner.name);
  }
}
