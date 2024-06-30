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
      server: {
        create: []
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