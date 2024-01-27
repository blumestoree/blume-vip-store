import { describe, it, expect, beforeEach, vi } from 'vitest';
import FindAllProductUseCase from './findAll.product.usecase';
import ProductRepositoryInterface from '../../../domain/product/repositories/product.repository.interface';
import { InputFindAllProductDto } from './findAll.product.dto';

const productRepositoryMock = {
  findAll: vi.fn(),
};

describe('FindAllProductUseCase', () => {
  let findAllProductUseCase: FindAllProductUseCase;

  beforeEach(() => {
    findAllProductUseCase = new FindAllProductUseCase(
      productRepositoryMock as unknown as ProductRepositoryInterface,
    );
  });

  it('should retrieve all products and return them', async () => {
    const input: InputFindAllProductDto = {
      serverId: 'server1',
      sort: 'asc',
      categoryId: ['id1', 'id2'],
    };

    const mockProducts = [
      {
        id: '1',
        name: 'Produto 1',
        gameItemName: 'Item de Jogo 1',
        categoryId: 'cat1',
        image: 'imagem1.jpg',
        price: 100,
        serverId: 'serverId',
        category: {
          id: 'idCategory',
          name: 'categoryid',
          functionInGame: 'Função no Jogo 1',
        },
      },
    ];

    productRepositoryMock.findAll.mockResolvedValueOnce(mockProducts);

    const result = await findAllProductUseCase.execute(input);

    expect(productRepositoryMock.findAll).toHaveBeenCalledWith(
      input.serverId,
      input.categoryId,
      input.sort,
    );

    expect(result).toEqual(
      mockProducts.map((product) => ({
        id: product.id,
        name: product.name,
        gameItemName: product.gameItemName,
        categoryId: product.categoryId,
        image: product.image,
        price: product.price,
        serverId: product.serverId,
        category: product.category
          ? {
              id: product.category.id,
              name: product.category.name,
              functionInGame: product.category.functionInGame,
            }
          : null,
      })),
    );
  });
});
