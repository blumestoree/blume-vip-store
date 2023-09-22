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
        serverOwnerId: entity.serverOwnerId,
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
        serverOwnerId: entity.serverOwnerId,
      },
    });
  }

  async findAll(): Promise<Server[]> {
    const servers = await this.prisma.server.findMany();
    return servers.map((server) => {
      return new Server(server.serverId, server.name, server.serverOwnerId);
    });
  }

  async find(serverId: string): Promise<Server> {
    let server;

    try {
      server = await this.prisma.server.findUniqueOrThrow({
        where: { serverId },
      });
    } catch (error) {
      throw new Error('Server not found');
    }

    return new Server(server.serverId, server.name, server.serverOwnerId);
  }
}
