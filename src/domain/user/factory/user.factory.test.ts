import { describe, expect, it } from 'vitest';
import UserFactory from './user.factory';

describe('User factory unit test', () => {
  it('should create a user', () => {
    const user = UserFactory.create('name', 'gameUserId', 'email@gmail.com', 'password');
    expect(user.id).not.toBeNull();
    expect(user.name).toBe('name');
    expect(user.gameUserId).toBe('gameUserId');
    expect(user.email).toBe('email@gmail.com');
    expect(user.password).not.toBeNull();
  });

  it('should create a user with id', () => {
    const user = UserFactory.create('name', 'gameUserId', 'email@gmail.com', 'password', 'id');
    expect(user.id).toEqual('id');
    expect(user.name).toBe('name');
    expect(user.gameUserId).toBe('gameUserId');
    expect(user.email).toBe('email@gmail.com');
    expect(user.password).not.toBeNull();
  });
});
