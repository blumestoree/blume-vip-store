import { PrismaClient } from "@prisma/client";
import type Product from "../../../domain/product/entity/product.entity";
import ProductFactory from "../../../domain/product/factory/product.factory";
import type ProductRepositoryInterface from "../../../domain/product/repositories/product.repository.interface";

export default class ProductRepository implements ProductRepositoryInterface {
	prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async create(entity: Product): Promise<void> {
		await this.prisma.product.create({
			data: {
				productId: entity.id,
				name: entity.name,
				gameItemName: entity.gameItemName,
				image: entity.image,
				price: entity.price,
				serverId: entity.serverId,
				categoryId: entity.categoryId,
			},
		});
	}

	async update(entity: Product): Promise<void> {
		await this.prisma.product.update({
			where: { productId: entity.id },
			data: {
				productId: entity.id,
				name: entity.name,
				gameItemName: entity.gameItemName,
				categoryId: entity.categoryId,
				image: entity.image,
				price: entity.price,
				serverId: entity.serverId,
			},
		});
	}

	async findAll(serverId: string, categoryId: string[] | undefined, sort: "desc" | "asc" | undefined): Promise<Product[]> {
		const products = await this.prisma.product.findMany({
			where: { serverId, categoryId: { in: categoryId } },
			orderBy: {
				price: sort,
			},
		});
		return products.map((product) => {
			return ProductFactory.create(
				product.name,
				product.gameItemName,
				product.image,
				product.price,
				product.serverId,
				product.categoryId,
				product.productId,
			);
		});
	}

	async findProductsByIds(productIds: string[]): Promise<Product[]> {
		let products;

		try {
			products = await this.prisma.product.findMany({
				where: { productId: { in: productIds } },
			});
		} catch (error) {
			throw new Error("Products not found");
		}

		return products.map((product) => {
			return ProductFactory.create(
				product.name,
				product.gameItemName,
				product.image,
				product.price,
				product.serverId,
				product.categoryId,
				product.productId,
			);
		});
	}

	async find(productId: string): Promise<Product> {
		let product;

		try {
			product = await this.prisma.product.findUniqueOrThrow({
				where: { productId },
			});
		} catch (error) {
			throw new Error("Product not found");
		}

		return ProductFactory.create(
			product.name,
			product.gameItemName,
			product.image,
			product.price,
			product.serverId,
			product.categoryId,
			product.productId,
		);
	}
}
