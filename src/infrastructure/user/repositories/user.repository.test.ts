import { beforeEach, describe, expect, it, vi } from 'vitest';
import UserRepository from './user.repository';
import UserFactory from '../../../domain/user/factory/user.factory';

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn().mockImplementation(() => ({
    user: {
      create: vi.fn().mockResolvedValue({}),
      update: vi.fn().mockResolvedValue({}),
      findMany: vi.fn().mockResolvedValue([]),
      findUniqueOrThrow: vi.fn().mockResolvedValue({}),
    },
  })),
}));

describe('User repository unit tests', () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
  });

  it('should create a new user', async () => {
    const mockUser = UserFactory.create(
      'Test Name',
      'TestGameUserId',
      'test@example.com',
      'password',
      'TestId',
    );
    await userRepository.create(mockUser);

    expect(userRepository.prisma.user.create).toHaveBeenCalledWith({
      data: {
        userId: mockUser.id,
        gameUserId: mockUser.gameUserId,
        name: mockUser.name,
        email: mockUser.email,
        password: mockUser.password,
      },
    });
  });
});
