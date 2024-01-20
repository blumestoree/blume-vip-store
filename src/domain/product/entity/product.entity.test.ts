import { describe, expect, it } from 'vitest';
import Product from './product.entity';

describe('Product unit tests', () => {
  it('should create a product', () => {
    const server = new Product('id', 'name', 'gameItemName', 'categoryId', 'image', 100, 'serverId');
    expect(server.id).toBe('id');
    expect(server.name).toBe('name');
    expect(server.gameItemName).toBe('gameItemName');
    expect(server.categoryId).toBe('categoryId');
    expect(server.image).toBe('image');
    expect(server.price).toBe(100);
    expect(server.serverId).toBe('serverId');
  });

  it('should give an invalid name error', () => {
    try {
      new Product('id', 'X', 'gameItemName', 'categoryId', 'image', 100, 'serverId');
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual('Nome inválido');
      }
    }
  });
});
