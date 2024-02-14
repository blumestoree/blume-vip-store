import { describe, expect, it } from 'vitest';
import ServerFactory from './server.factory';

describe('Server factory unit test', () => {
  it('should create a server', () => {
    const server = ServerFactory.create('name', 'image', ['bannerImages'], 'serverOwnerId');
    expect(server.id).not.toBeNull();
    expect(server.name).toBe('name');
    expect(server.image).toBe('image');
    expect(server.banner).toEqual(expect.arrayContaining(['bannerImages']));
    expect(server.serverOwnerId).toBe('serverOwnerId');
  });

  it('should create a server with id', () => {
    const server = ServerFactory.create('name', 'image', ['bannerImages'], 'serverOwnerId', 'id');
    expect(server.id).toEqual('id');
    expect(server.name).toBe('name');
    expect(server.image).toBe('image');
    expect(server.banner).toEqual(expect.arrayContaining(['bannerImages']));
    expect(server.serverOwnerId).toBe('serverOwnerId');
  });
});
