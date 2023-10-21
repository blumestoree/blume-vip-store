import { describe, expect, it } from 'vitest';
import User from './user.entity';

describe('User unit tests', () => {
  it('should create a user', () => {
    const user = new User('ID', 'name', 'email@gmail.com', 'password');
    expect(user.id).toBe('ID');
    expect(user.name).toBe('name');
    expect(user.email).toBe('email@gmail.com');
    expect(user.password).not.toBeNull();
  });

  it('should give an invalid email error', () => {
    try {
      new User('ID', 'name', 'email', 'password');
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual('Email inválido');
      }
    }
  });

  it('should give an invalid name error', () => {
    try {
      new User('ID', 'X', 'email@gmail.com', 'password');
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual('Nome inválido');
      }
    }
  });

  it('should give an invalid password error', () => {
    try {
      new User('ID', 'name', 'email@gmail.com', 'X');
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual('Senha inválida');
      }
    }
  });
});
