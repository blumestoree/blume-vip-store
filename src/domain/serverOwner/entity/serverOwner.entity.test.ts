import { describe, expect, it } from 'vitest';
import ServerOwner from './serverOwner.entity';

describe('Owner unit tests', () => {
  it('should create a user', () => {
    const serverOwner = new ServerOwner('ID', 'name', 'email@gmail.com', 'password');
    expect(serverOwner.serverOwnerId).toBe('ID');
    expect(serverOwner.name).toBe('name');
    expect(serverOwner.email).toBe('email@gmail.com');
    expect(serverOwner.password).toBe('password');
  });

  it('should create a user and a serverId', () => {
    const serverOwner = new ServerOwner('ID', 'name', 'email@gmail.com', 'password');
    serverOwner.changeServer(1);
    expect(serverOwner.serverId).toBe(1);
  });

  it('should give an invalid email error', () => {
    try {
      new ServerOwner('ID', 'name', 'email', 'password');
    } catch (error) {
      expect(error).toContainEqual({
        message: 'Email inválido',
        path: ['_email'],
      });
    }
  });

  it('should give an invalid name error', () => {
    try {
      new ServerOwner('ID', 'X', 'email@gmail.com', 'password');
    } catch (error) {
      expect(error).toContainEqual({
        message: 'Nome inválido',
        path: ['_name'],
      });
    }
  });

  it('should give an invalid password error', () => {
    try {
      new ServerOwner('ID', 'name', 'email@gmail.com', 'X');
    } catch (error) {
      expect(error).toContainEqual({
        message: 'Senha inválida',
        path: ['_password'],
      });
    }
  });
});
