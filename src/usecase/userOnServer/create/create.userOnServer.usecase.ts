import type ServerFacadeInterface from "../../../domain/server/facade/server.facade.interface";
import ServerFactory from "../../../domain/server/factory/server.factory";
import UserOnServerFactory from "../../../domain/userOnServer/factory/userOnServe.factory";
import type UserOnServerRepositoryInterface from "../../../domain/userOnServer/repositories/userOnServer.repository.interface";
import type UseCaseInterface from "../../../shared/usecase.interface";
import type { InputCreateUserOnServerDto, OutputCreateUserOnServerDto } from "./create.userOnServer.dto";

export default class CreateUserOnServerUseCase
	implements UseCaseInterface<InputCreateUserOnServerDto, OutputCreateUserOnServerDto>
{
	constructor(
		private userOnServerRepository: UserOnServerRepositoryInterface,
		private serverFacade: ServerFacadeInterface,
	) {}

	async execute(input: InputCreateUserOnServerDto): Promise<OutputCreateUserOnServerDto> {
		const serverFacadeDto = {
			id: input.serverId,
		};

		const serverFacade = await this.serverFacade.findServer(serverFacadeDto);

		const server = ServerFactory.create(
			serverFacade.name,
			serverFacade.slug,
			serverFacade.image,
			serverFacade.banner,
			serverFacade.serverOwnerId,
			serverFacade.id,
		);

		const userOnServer = UserOnServerFactory.create(input.userId, server, input.gameUserId, input.nickname);
		await this.userOnServerRepository.create(userOnServer);

		return {
			userId: input.userId,
			serverId: input.serverId,
			gameUserId: input.gameUserId,
			nickname: input.nickname,
		};
	}
}
