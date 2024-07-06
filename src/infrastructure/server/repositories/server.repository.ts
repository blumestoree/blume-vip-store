import { PrismaClient } from '@prisma/client';
import ServerRepositoryInterface from '../../../domain/server/repositories/server.repository.interface';
import Server from '../../../domain/server/entity/server.entity';
import ServerFactory from '../../../domain/server/factory/server.factory';

export default class ServerRepository implements ServerRepositoryInterface {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(entity: Server): Promise<void> {
    await this.prisma.server.create({
      data: {
        serverId: entity.id,
        name: entity.name,
        image: entity.image,
        banner: entity.banner,
        serverOwnerId: entity.serverOwnerId,
        product: {
          create: [],
        },
        category: {
          create: [],
        },
        userOnServer: {
          create: [],
        },
      },
    });
  }

  async update(entity: Server): Promise<void> {
    await this.prisma.server.update({
      where: { serverId: entity.id },
      data: {
        serverId: entity.id,
        name: entity.name,
        image: entity.image,
        banner: entity.banner,
        serverOwnerId: entity.serverOwnerId,
      },
    });
  }

  async findAll(): Promise<Server[]> {
    const servers = await this.prisma.server.findMany({
      include: {
        product: true,
        category: true,
      }
    });
    return servers.map((server) => {
      return ServerFactory.create(
        server.name,
        server.image,
        server.banner,
        server.serverOwnerId,
        server.serverId,
        server.product.map((product) => product.productId),
        server.category.map((category) => category.categoryId),
      );
    });
  }

  async find(serverId: string): Promise<Server> {
    let server;

    try {
      server = await this.prisma.server.findUniqueOrThrow({
        where: { serverId },
        include: {
          product: true,
          category: true,
        }
      });
    } catch (error) {
      throw new Error('Server not found');
    }

    return ServerFactory.create(
      server.name,
      server.image,
      server.banner,
      server.serverOwnerId,
      server.serverId,
      server.product.map((product) => product.productId),
      server.category.map((category) => category.categoryId),
    );
  }
}
