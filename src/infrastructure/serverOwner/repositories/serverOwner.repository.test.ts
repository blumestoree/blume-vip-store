// import { PrismaClient } from '@prisma/client';
// import { afterEach, beforeEach, describe, expect, it } from 'vitest';
// import ServerOwner from '../../../domain/serverOwner/entity/serverOwner.entity';
// import OwnerRepository from './serverOwner.repository';

// describe('Owner repository test', () => {
//   let prisma: PrismaClient;
//   let ownerRepository: OwnerRepository;

//   beforeEach(async () => {
//     prisma = new PrismaClient();
//     ownerRepository = new OwnerRepository();
//   });

//   afterEach(async () => {
//     await prisma.$disconnect();
//   });

//   it('should throw an error when owner is not found', async () => {
//     expect(async () => {
//       await ownerRepository.find(0);
//     }).toThrowError('Owner not found');
//   });

//   it('should create a new owner', async () => {
//     const ownerData = new ServerOwner('name', 'email', 'password');
//     await ownerRepository.create(ownerData);
//   });

//   it('should find a new owner', async () => {
//     const ownerData = new ServerOwner('name', 'email', 'password');
//     await ownerRepository.create(ownerData);
//   });
// });
