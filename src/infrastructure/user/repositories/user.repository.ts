import { PrismaClient } from "@prisma/client";
import ServerFactory from "../../../domain/server/factory/server.factory";
import type User from "../../../domain/user/entity/user.entity";
import UserFactory from "../../../domain/user/factory/user.factory";
import type UserRepositoryInterface from "../../../domain/user/repositories/user.repository";
import UserOnServerFactory from "../../../domain/userOnServer/factory/userOnServe.factory";

export default class UserRepository implements UserRepositoryInterface {
	prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async create(entity: User): Promise<void> {
		await this.prisma.user.create({
			data: {
				userId: entity.id,
				name: entity.name,
				email: entity.email,
				password: entity.password,
			},
		});
	}

	async update(entity: User): Promise<void> {
		await this.prisma.user.update({
			where: { userId: entity.id },
			data: {
				userId: entity.id,
				name: entity.name,
				gameUserId: entity.gameUserId,
				email: entity.email,
				password: entity.password,
			},
		});
	}

	async findAll(): Promise<User[]> {
		const users = await this.prisma.user.findMany();
		return users.map((user) => {
			return UserFactory.create(user.name, user.email, user.password, user.userId);
		});
	}

	async find(userId: string): Promise<User> {
		let user;

		try {
			user = await this.prisma.user.findUniqueOrThrow({
				where: { userId },
				include: {
					userOnServer: {
						include: {
							server: true,
						},
					},
				},
			});
		} catch (error) {
			throw new Error("User not found");
		}

		const userOnServers = user.userOnServer.map((userOnServer) => {
			const server = ServerFactory.create(
				userOnServer.server.name,
				userOnServer.server.image,
				userOnServer.server.banner,
				userOnServer.server.serverOwnerId,
				userOnServer.server.serverId,
			);

			return UserOnServerFactory.create(
				userOnServer.userId,
				server,
				userOnServer.gameUserId,
				userOnServer.nickname,
				userOnServer.userOnServerId,
			);
		});

		return UserFactory.create(user.name, user.email, user.password, user.userId, [], userOnServers);
	}

	async findUserByEmail(email: string): Promise<User> {
		let user;

		try {
			user = await this.prisma.user.findUniqueOrThrow({
				where: { email },
			});
		} catch (error) {
			throw new Error("User not found");
		}

		return UserFactory.create(user.name, user.gameUserId, user.email, user.password, user.userId);
	}
}
