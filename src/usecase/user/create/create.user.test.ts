import { describe, it, expect, beforeEach, vi } from 'vitest';
import CreateUserUseCase from './create.user.usecase';
import UserRepositoryInterface from '../../../domain/user/repositories/user.repository';
import { InputCreateUserDto } from './create.user.dto';

const userRepositoryMock = {
  create: vi.fn(),
};

vi.mock('../../../domain/user/factory/user.factory', async () => {
  return {
    default: {
      create: () => ({
        id: '123',
        name: 'User teste',
        gameUserId: 'gameUserId',
        email: 'emailteste@gmail.com',
        password: 'passwordTest',
        encryptPassword: function (password: string) {
          this.password = `encrypted-${password}`;
        },
      }),
    },
  };
});

vi.mock('../../authToken/factory/authToken.usecase.factory', () => {
  return {
    default: {
      create: () => ({
        createToken: vi.fn(() => 'mockToken'),
        createRefreshToken: vi.fn(() => 'mockRefreshToken'),
      }),
    },
  };
});

describe('Create user usecase entity unit tests', () => {
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase(
      userRepositoryMock as unknown as UserRepositoryInterface,
    );
  });

  it('should create a user and return it`s data', async () => {
    const input: InputCreateUserDto = {
      name: 'name',
      gameUserId: 'gameUserId',
      password: 'password',
      email: 'emailteste@gmail.com',
    };

    const result = await createUserUseCase.execute(input);

    expect(userRepositoryMock.create).toHaveBeenCalled();
    expect(result).toEqual({
      id: '123',
      name: 'User teste',
      gameUserId: 'gameUserId',
      email: 'emailteste@gmail.com',
      token: 'mockToken',
      refreshToken: 'mockRefreshToken',
    });
  });
});
