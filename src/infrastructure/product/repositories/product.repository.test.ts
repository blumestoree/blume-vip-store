import { describe, it, expect, beforeEach, vi } from 'vitest';
import ProductRepository from './product.repository';
import ProductFactory from '../../../domain/product/factory/product.factory';

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn().mockImplementation(() => ({
    product: {
      create: vi.fn().mockResolvedValue({}),
      update: vi.fn().mockResolvedValue({}),
      findMany: vi.fn().mockResolvedValue([]),
      findUniqueOrThrow: vi.fn().mockResolvedValue({}),
    },
  })),
}));

describe('Product repository unit tests', () => {
  let productRepository: ProductRepository;

  beforeEach(() => {
    productRepository = new ProductRepository();
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

    expect(productRepository.prisma.product.create).toHaveBeenCalledWith({
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
