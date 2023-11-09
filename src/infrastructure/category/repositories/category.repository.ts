import { PrismaClient } from '@prisma/client';
import CategoryRepositoryInterface from '../../../domain/category/repositories/category.repository.interface';
import CategoryFactory from '../../../domain/category/factory/category.factory';
import Category from '../../../domain/category/entity/category.entity';

export default class CategoryRepository implements CategoryRepositoryInterface {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(entity: Category): Promise<void> {
    await this.prisma.category.create({
      data: {
        categoryId: entity.id,
        name: entity.name,
      },
    });
  }

  async update(entity: Category): Promise<void> {
    await this.prisma.category.update({
      where: { categoryId: entity.id },
      data: {
        categoryId: entity.id,
        name: entity.name,
      },
    });
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();

    return categories.map((category) => {
      return CategoryFactory.create(category.name, category.categoryId);
    });
  }

  async find(categoryId: string): Promise<Category> {
    let category;

    try {
      category = await this.prisma.category.findUniqueOrThrow({
        where: { categoryId },
      });
    } catch (error) {
      throw new Error('Category not found');
    }

    return CategoryFactory.create(category.name, category.categoryId);
  }
}
