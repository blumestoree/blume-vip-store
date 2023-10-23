import { describe, expect, it } from 'vitest';
import ProductFactory from './product.factory';

describe('Product factory unit test', () => {
  it('should create a product', () => {
    const server = ProductFactory.create('name', 100, 'serverId');
    expect(server.id).not.toBeNull();
    expect(server.name).toBe('name');
    expect(server.price).toBe(100);
    expect(server.serverId).toBe('serverId');
  });

  it('should create a server with id', () => {
    const server = ProductFactory.create('name', 100, 'serverId', 'id');
    expect(server.id).toEqual('id');
    expect(server.name).toBe('name');
    expect(server.price).toBe(100);
    expect(server.serverId).toBe('serverId');
  });
});
