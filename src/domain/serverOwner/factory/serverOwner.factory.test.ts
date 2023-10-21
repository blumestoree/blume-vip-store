import { describe, expect, it } from 'vitest';
import ServerOwnerFactory from './serverOwner.factory';

describe('ServerOwner factory unit test', () => {
  it('should create a server owner', () => {
    const serverOwner = ServerOwnerFactory.create('name', 'email@gmail.com', 'password');
    expect(serverOwner.id).not.toBeNull();
    expect(serverOwner.name).toBe('name');
    expect(serverOwner.email).toBe('email@gmail.com');
    expect(serverOwner.password).not.toBeNull();
    expect(serverOwner.serverId).toBeUndefined();
  });

  it('should create a server owner with id', () => {
    const serverOwner = ServerOwnerFactory.create('name', 'email@gmail.com', 'password', 'id');
    expect(serverOwner.id).toEqual('id');
    expect(serverOwner.name).toBe('name');
    expect(serverOwner.email).toBe('email@gmail.com');
    expect(serverOwner.password).not.toBeNull();
    expect(serverOwner.serverId).toBeUndefined();
  });

  it('should create a server owner with id and serverId', () => {
    const serverOwner = ServerOwnerFactory.create(
      'name',
      'email@gmail.com',
      'password',
      'id',
      'serverId',
    );
    expect(serverOwner.id).toEqual('id');
    expect(serverOwner.name).toBe('name');
    expect(serverOwner.email).toBe('email@gmail.com');
    expect(serverOwner.password).not.toBeNull();
    expect(serverOwner.serverId).toBe('serverId');
  });
});
