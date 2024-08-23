import { PrismaClient } from "@prisma/client";
import type Server from "../../../domain/server/entity/server.entity";
import ServerFactory from "../../../domain/server/factory/server.factory";
import type ServerRepositoryInterface from "../../../domain/server/repositories/server.repository.interface";

export default class ServerRepository implements ServerRepositoryInterface {
	prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async create(entity: Server): Promise<void> {
		await this.prisma.server.create({
			data: {
				serverId: entity.id,
				name: entity.name,
				slug: entity.slug,
				image: entity.image,
				banner: entity.banner,
				serverOwnerId: entity.serverOwnerId,
				product: {
					create: [],
				},
				category: {
					create: [],
				},
				userOnServer: {
					create: [],
				},
			},
		});
	}

	async update(entity: Server): Promise<void> {
		await this.prisma.server.update({
			where: { serverId: entity.id },
			data: {
				serverId: entity.id,
				name: entity.name,
				slug: entity.slug,
				image: entity.image,
				banner: entity.banner,
				serverOwnerId: entity.serverOwnerId,
			},
		});
	}

	async findAll(): Promise<Server[]> {
		const servers = await this.prisma.server.findMany({
			include: {
				product: true,
				category: true,
			},
		});
		return servers.map((server) => {
			return ServerFactory.create(
				server.name,
				server.slug,
				server.image,
				server.banner,
				server.serverOwnerId,
				server.serverId,
				server.product.map((product) => product.productId),
				server.category.map((category) => category.categoryId),
			);
		});
	}

	async findWithParam(param: { name?: string; id?: string; slug?: string }) {
		let servers;

		try {
			servers = await this.prisma.server.findFirstOrThrow({
				where: {
					AND: [
						param.id ? { serverId: param.id } : {},
						param.name ? { name: param.name } : {},
						param.slug ? { slug: param.slug } : {},
					],
				},
				include: {
					product: true,
					category: true,
				},
			});
		} catch (error) {
			throw new Error("Server not found");
		}

		return ServerFactory.create(
			servers.name,
			servers.slug,
			servers.image,
			servers.banner,
			servers.serverOwnerId,
			servers.serverId,
			servers.product.map((product) => product.productId),
			servers.category.map((category) => category.categoryId),
		);
	}

	async find(serverId: string): Promise<Server> {
		let server;

		try {
			server = await this.prisma.server.findUniqueOrThrow({
				where: { serverId },
				include: {
					product: true,
					category: true,
				},
			});
		} catch (error) {
			throw new Error("Server not found");
		}

		return ServerFactory.create(
			server.name,
			server.image,
			server.slug,
			server.banner,
			server.serverOwnerId,
			server.serverId,
			server.product.map((product) => product.productId),
			server.category.map((category) => category.categoryId),
		);
	}
}
