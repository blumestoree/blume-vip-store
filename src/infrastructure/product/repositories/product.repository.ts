import { PrismaClient } from '@prisma/client';
import ProductRepositoryInterface from '../../../domain/product/repositories/product.repository.interface';
import Product from '../../../domain/product/entity/product.entity';
import ProductFactory from '../../../domain/product/factory/product.factory';

export default class productRepository implements ProductRepositoryInterface {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(entity: Product): Promise<void> {
    await this.prisma.product.create({
      data: {
        productId: entity.id,
        name: entity.name,
        price: entity.price,
        serverId: entity.serverId,
      },
    });
  }

  async update(entity: Product): Promise<void> {
    await this.prisma.product.update({
      where: { productId: entity.id },
      data: {
        productId: entity.id,
        name: entity.name,
        price: entity.price,
        serverId: entity.serverId,
      },
    });
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();
    return products.map((product) => {
      return ProductFactory.create(
        product.name,
        product.price,
        product.serverId,
        product.productId,
      );
    });
  }

  async find(productId: string): Promise<Product> {
    let product;

    try {
      product = await this.prisma.product.findUniqueOrThrow({
        where: { productId },
      });
    } catch (error) {
      throw new Error('Product not found');
    }

    return ProductFactory.create(product.name, product.price, product.serverId, product.productId);
  }
}
