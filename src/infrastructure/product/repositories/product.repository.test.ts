import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PrismaClient } from '@prisma/client';
import ProductRepository from './product.repository';
import ProductFactory from '../../../domain/product/factory/product.factory';

vi.mock('@prisma/client', () => {
  const prismaMock = {
    product: {
      create: vi.fn(),
      update: vi.fn(),
      findMany: vi.fn(),
      findUniqueOrThrow: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => prismaMock) };
});

describe('Product repository unit tests', () => {
  let productRepository: ProductRepository;
  let prisma: PrismaClient;

  beforeEach(() => {
    productRepository = new ProductRepository();
    prisma = new PrismaClient();
  });

  it('should create a product', async () => {
    const productMock = ProductFactory.create(
      'name',
      'gameItemName',
      'categoryId',
      'image',
      100,
      'serverId',
    );

    await productRepository.create(productMock);

    expect(prisma.product.create).toHaveBeenCalledWith({
      data: {
        productId: productMock.id,
        name: productMock.name,
        gameItemName: productMock.gameItemName,
        categoryId: productMock.categoryId,
        image: productMock.image,
        price: productMock.price,
        serverId: productMock.serverId,
      },
    });
  });
});
