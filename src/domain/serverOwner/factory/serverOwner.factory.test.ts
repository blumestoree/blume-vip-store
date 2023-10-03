import { describe, expect, it } from 'vitest';
import ServerOwnerFactory from './serverOwner.factory';

describe('ServerOwner factory unit test', () => {
  it('should create a ServerOwner', () => {
    const serverOwner = ServerOwnerFactory.create('name', 'email@gmail.com', 'password');
    expect(serverOwner.serverOwnerId).not.toBeNull();
    expect(serverOwner.name).toBe('name');
    expect(serverOwner.email).toBe('email@gmail.com');
    expect(serverOwner.password).toBe('password');
    expect(serverOwner.serverId).toBeUndefined();
  });

  it('should create a ServerOwner with server', () => {
    const serverOwner = ServerOwnerFactory.createWithServer(
      'name',
      'email@gmail.com',
      'password',
      1,
    );
    expect(serverOwner.serverOwnerId).not.toBeNull();
    expect(serverOwner.name).toBe('name');
    expect(serverOwner.email).toBe('email@gmail.com');
    expect(serverOwner.password).toBe('password');
    expect(serverOwner.serverId).toBe(1);
  });
});
