import { describe, expect, it } from 'vitest';
import ServerOwner from './serverOwner.entity';

describe('ServerOwner unit tests', () => {
  it('should create a server owner', () => {
    const serverOwner = new ServerOwner('ID', 'name', 'email@gmail.com', 'password');
    expect(serverOwner.id).toBe('ID');
    expect(serverOwner.name).toBe('name');
    expect(serverOwner.email).toBe('email@gmail.com');
    expect(serverOwner.password).not.toBeNull();
  });

  it('should create a user and a serverId', () => {
    const serverOwner = new ServerOwner('ID', 'name', 'email@gmail.com', 'password', 'serverID');
    expect(serverOwner.serverId).toBe('serverID');
  });

  it('should give an invalid email error', () => {
    try {
      new ServerOwner('ID', 'name', 'email', 'password');
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual('Email inválido');
      }
    }
  });

  it('should give an invalid name error', () => {
    try {
      new ServerOwner('ID', 'X', 'email@gmail.com', 'password');
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual('Nome inválido');
      }
    }
  });

  it('should give an invalid password error', () => {
    try {
      new ServerOwner('ID', 'name', 'email@gmail.com', 'X');
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual('Senha inválida');
      }
    }
  });
});
