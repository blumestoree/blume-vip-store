import { describe, expect, it } from 'vitest';
import AuthTokenFactory from './authtoken.factory';

describe('AuthToken factory unit test', () => {
  it('should create a auth token', () => {
    const authToken = AuthTokenFactory.create('id', 100, 'userId');
    expect(authToken.id).toBe('id');
    expect(authToken.expiresIn).toBe(100);
    expect(authToken.userId).toBe('userId');
  });
});
