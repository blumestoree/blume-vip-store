import { PrismaClient } from "@prisma/client";
import type UserOnServer from "../../../domain/userOnServer/entity/userOnServer.entity";
import type UserOnServerRepositoryInterface from "../../../domain/userOnServer/repositories/userOnServer.repository.interface";

export default class UserOnServerRepository implements UserOnServerRepositoryInterface {
	prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async create(entity: UserOnServer): Promise<void> {
		await this.prisma.userOnServer.create({
			data: {
				userOnServerId: entity.id,
				gameUserId: entity.gameUserId,
				nickname: entity.nickname,
				user: {
					connect: {
						userId: entity.userId,
					},
				},
				server: {
					connect: {
						serverId: entity.server.id,
					},
				},
			},
		});
	}

	async update(entity: UserOnServer): Promise<void> {}

	async findAll(): Promise<UserOnServer[]> {}

	async find(userOnServerId: string): Promise<UserOnServer> {}
}
