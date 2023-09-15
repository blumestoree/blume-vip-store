import { PrismaClient } from '@prisma/client';
import ProductRepositoryInterface from '../../../domain/product/repositories/product.repository.interface';
import Product from '../../../domain/product/entity/product.entity';

export default class productRepository implements ProductRepositoryInterface {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(entity: Product): Promise<void> {
    await this.prisma.product.create({
      data: {
        productId: entity.productId,
        name: entity.name,
        price: entity.price,
      },
    });
  }

  async update(entity: Product): Promise<void> {
    await this.prisma.product.update({
      where: {
        productId: entity.productId,
      },
      data: {
        name: entity.name,
        price: entity.price,
        productId: entity.productId,
      },
    });
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();
    return products.map((product) => {
      return new Product(product.productId, product.name, product.price);
    });
  }

  async find(productId: string): Promise<Product> {
    let product;

    try {
      product = await this.prisma.product.findUniqueOrThrow({
        where: { productId },
      });
    } catch (error) {
      throw new Error('product not found');
    }

    return new Product(product.productId, product.name, product.price);
  }
}
