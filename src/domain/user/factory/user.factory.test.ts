import { describe, expect, it } from 'vitest';
import UserFactory from './user.factory';

describe('User factory unit test', () => {
  it('should create a user', () => {
    const serverOwner = UserFactory.create('name', 'email@gmail.com', 'password');
    expect(serverOwner.id).not.toBeNull();
    expect(serverOwner.name).toBe('name');
    expect(serverOwner.email).toBe('email@gmail.com');
    expect(serverOwner.password).not.toBeNull();
  });

  it('should create a user with id', () => {
    const serverOwner = UserFactory.create('name', 'email@gmail.com', 'password', 'id');
    expect(serverOwner.id).toEqual('id');
    expect(serverOwner.name).toBe('name');
    expect(serverOwner.email).toBe('email@gmail.com');
    expect(serverOwner.password).not.toBeNull();
  });
});
