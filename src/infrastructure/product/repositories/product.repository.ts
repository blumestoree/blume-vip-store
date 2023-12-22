import { PrismaClient } from '@prisma/client';
import ProductRepositoryInterface from '../../../domain/product/repositories/product.repository.interface';
import Product from '../../../domain/product/entity/product.entity';
import ProductFactory from '../../../domain/product/factory/product.factory';
import CategoryFactory from '../../../domain/category/factory/category.factory';

export default class ProductRepository implements ProductRepositoryInterface {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(entity: Product): Promise<void> {
    await this.prisma.product.create({
      data: {
        productId: entity.id,
        name: entity.name,
        categoryId: entity.categoryId,
        image: entity.image,
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
        categoryId: entity.categoryId,
        image: entity.image,
        price: entity.price,
        serverId: entity.serverId,
      },
    });
  }

  async findAll(
    serverId: string,
    categoryId: string[] | undefined,
    sort: 'desc' | 'asc' | undefined,
  ): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: { serverId, categoryId: { in: categoryId } },
      include: {
        category: true,
      },
      orderBy: {
        price: sort,
      },
    });
    return products.map((product) => {
      const category = CategoryFactory.create(product.category.name, product.category.categoryId);
      return ProductFactory.create(
        product.name,
        product.categoryId,
        product.image,
        product.price,
        product.serverId,
        product.productId,
        category,
      );
    });
  }

  async findProductsByIds(productIds: string[]): Promise<Product[]> {
    let products;

    try {
      products = await this.prisma.product.findMany({
        include: {
          category: true,
        },
        where: { productId: { in: productIds } },
      });
    } catch (error) {
      throw new Error('Products not found');
    }

    return products.map((product) => {
      const category = CategoryFactory.create(product.category.name, product.category.categoryId);
      return ProductFactory.create(
        product.name,
        product.categoryId,
        product.image,
        product.price,
        product.serverId,
        product.productId,
        category,
      );
    });
  }

  async find(productId: string): Promise<Product> {
    let product;

    try {
      product = await this.prisma.product.findUniqueOrThrow({
        include: {
          category: true,
        },
        where: { productId },
      });
    } catch (error) {
      throw new Error('Product not found');
    }

    const category = CategoryFactory.create(product.category.name, product.category.categoryId);
    return ProductFactory.create(
      product.name,
      product.categoryId,
      product.image,
      product.price,
      product.serverId,
      product.productId,
      category,
    );
  }
}
