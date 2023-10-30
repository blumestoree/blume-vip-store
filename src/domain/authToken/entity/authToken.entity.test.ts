import { describe, expect, it } from 'vitest';
import AuthToken from './authToken.entity';

describe('AuthToken unit tests', () => {
  it('should create a auth token', () => {
    const authToken = new AuthToken('id', 100, 'userId');
    expect(authToken.id).toBe('id');
    expect(authToken.expiresIn).toBe(100);
    expect(authToken.userId).toBe('userId');
  });
});
