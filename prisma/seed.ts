import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.serverOwner.upsert({
    where: { serverOwnerId: '1' },
    update: {},
    create: {
      serverOwnerId: '1',
      name: 'blume',
      email: 'blume@gmail.com',
      password: '123',
    }
  });

  await prisma.server.upsert({
    where: { serverId: '1' },
    update: {},
    create: {
      serverId: "1",
      name: "Zeta Roleplay",
      image: "123",
      banner: ["123"],
      serverOwnerId: "1",
    }
  });

  await prisma.category.upsert({
    where: { categoryId: '1' },
    update: {},
    create: {
      categoryId: '1',
      functionInGame: 'addCar',
      name: 'Carros',
      server: {
        connect: { serverId: '1' } 
      }
    }
  });
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
});