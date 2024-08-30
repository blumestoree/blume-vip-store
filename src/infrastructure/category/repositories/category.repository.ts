import { PrismaClient } from "@prisma/client";
import type Category from "../../../domain/category/entity/category.entity";
import CategoryFactory from "../../../domain/category/factory/category.factory";
import type CategoryRepositoryInterface from "../../../domain/category/repositories/category.repository.interface";
import ProductFactory from "../../../domain/product/factory/product.factory";

export default class CategoryRepository implements CategoryRepositoryInterface {
	prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async create(entity: Category): Promise<void> {
		await this.prisma.category.create({
			data: {
				categoryId: entity.id,
				name: entity.name,
				functionInGame: entity.functionInGame,
				serverId: entity.serverId,
			},
		});
	}

	async update(entity: Category): Promise<void> {
		await this.prisma.category.update({
			where: { categoryId: entity.id },
			data: {
				categoryId: entity.id,
				name: entity.name,
				functionInGame: entity.functionInGame,
				serverId: entity.serverId,
			},
		});
	}

	async findAll(serverId: string): Promise<Category[]> {
		const categories = await this.prisma.category.findMany({
			where: { serverId },
			include: {
				product: true,
			},
		});

		return categories.map((category) => {
			const products = category.product.map((product) => {
				return ProductFactory.create(
					product.name,
					product.gameItemName,
					product.image,
					product.price,
					product.serverId,
					category.categoryId,
					product.productId,
				);
			});

			return CategoryFactory.create(category.name, category.functionInGame, category.serverId, category.categoryId, products);
		});
	}

	async find(categoryId: string, serverId: string): Promise<Category> {
		let category;

		try {
			category = await this.prisma.category.findUniqueOrThrow({
				include: {
					product: true,
				},
				where: { categoryId, serverId },
			});
		} catch (error) {
			throw new Error("Category not found");
		}

		const products = category.product.map((product) => {
			return ProductFactory.create(
				product.name,
				product.gameItemName,
				product.image,
				product.price,
				product.serverId,
				category.categoryId,
				product.productId,
			);
		});

		return CategoryFactory.create(category.name, category.functionInGame, category.serverId, category.categoryId, products);
	}
}
