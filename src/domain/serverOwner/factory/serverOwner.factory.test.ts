import { describe, expect, it } from 'vitest';
import ServerOwnerFacture from './serverOwner.factory';

describe('ServerOwner factory unit test', () => {
  it('should create a ServerOwner', () => {
    const serverOwner = ServerOwnerFacture.create('name', 'email@gmail.com', 'password');
    expect(serverOwner.serverOwnerId).not.toBeNull();
    expect(serverOwner.name).toBe('name');
    expect(serverOwner.email).toBe('email@gmail.com');
    expect(serverOwner.password).toBe('password');
    expect(serverOwner.serverId).toBeUndefined();
  });

  it('should create a ServerOwner with server', () => {
    const serverOwner = ServerOwnerFacture.createWithServer(
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
