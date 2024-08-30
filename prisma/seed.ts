import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	await prisma.serverOwner.upsert({
		where: { serverOwnerId: "1" },
		update: {},
		create: {
			serverOwnerId: "1",
			name: "blume",
			email: "blume@gmail.com",
			password: "123",
		},
	});

	await prisma.server.upsert({
		where: { serverId: "1" },
		update: {},
		create: {
			serverId: "1",
			name: "Zeta Roleplay",
			slug: "zeta-roleplay",
			image: "123",
			banner: ["123"],
			serverOwnerId: "1",
		},
	});

	await prisma.category.upsert({
		where: { categoryId: "1" },
		update: {},
		create: {
			categoryId: "1",
			functionInGame: "addCar",
			name: "Carros",
			serverId: "1",
		},
	});

	await prisma.product.upsert({
		where: { productId: "1" },
		update: {},
		create: {
			productId: "1",
			name: "Carro",
			gameItemName: "Panto",
			image: "",
			price: 100,
			categoryId: "1",
			serverId: "1",
		},
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
