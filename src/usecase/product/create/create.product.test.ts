import { describe, it, expect, beforeEach, vi } from 'vitest';
import CreateProductUseCase from './create.product.usecase';
import ProductRepositoryInterface from '../../../domain/product/repositories/product.repository.interface';
import UploadImageInterface from '../../../infrastructure/product/uploadImage/product.uploadImage.interface';
import { InputCreateProductDto } from './create.product.dto';

const productRepositoryMock = {
  create: vi.fn(),
  find: vi.fn(),
};

const uploadImageMock = {
  sendImage: vi.fn(),
};

vi.mock('../../../domain/product/factory/product.factory', async () => {
  return {
    default: {
      create: () => ({
        id: '123',
        name: 'Produto Teste',
        gameItemName: 'Item de Jogo',
        categoryId: 'cat123',
        image: 'imagem.jpg',
        price: 100,
        serverId: 'server1',
      }),
    },
  };
});

describe('Create product usecase entity unit tests', () => {
  let createProductUseCase: CreateProductUseCase;

  beforeEach(() => {
    createProductUseCase = new CreateProductUseCase(
      productRepositoryMock as unknown as ProductRepositoryInterface,
      uploadImageMock as unknown as UploadImageInterface,
    );
  });

  it('should create a product and return it`s data', async () => {
    const input: InputCreateProductDto = {
      name: 'Produto Teste',
      gameItemName: 'Item de Jogo',
      image: 'imagem.jpg',
      categoryId: 'cat123',
      price: 100,
      serverId: 'server1',
    };

    productRepositoryMock.find.mockResolvedValueOnce({
      id: '123',
      name: input.name,
      gameItemName: input.gameItemName,
      categoryId: input.categoryId,
      image: input.image,
      price: input.price,
      serverId: input.serverId,
      category: {
        id: 'cat123',
        name: 'Categoria Teste',
        functionInGame: 'Função no Jogo',
      },
    });

    const result = await createProductUseCase.execute(input);

    expect(productRepositoryMock.create).toHaveBeenCalled();
    expect(uploadImageMock.sendImage).toHaveBeenCalledWith(input.image);
    expect(result).toEqual({
      id: '123',
      name: input.name,
      gameItemName: input.gameItemName,
      categoryId: input.categoryId,
      image: input.image,
      price: input.price,
      serverId: input.serverId,
      category: {
        id: 'cat123',
        name: 'Categoria Teste',
        functionInGame: 'Função no Jogo',
      },
    });
  });
});
