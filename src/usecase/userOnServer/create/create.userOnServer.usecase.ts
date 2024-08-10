import UserOnServerFactory from "../../../domain/userOnServer/factory/userOnServe.factory";
import type UserOnServerRepositoryInterface from "../../../domain/userOnServer/repositories/userOnServer.repository.interface";
import type UseCaseInterface from "../../../shared/usecase.interface";
import type { InputCreateUserOnServerDto, OutputCreateUserOnServerDto } from "./create.userOnServer.dto";

export default class CreateUserOnServerUseCase
	implements UseCaseInterface<InputCreateUserOnServerDto, OutputCreateUserOnServerDto>
{
	constructor(private userOnServerRepository: UserOnServerRepositoryInterface) {}

	async execute(input: InputCreateUserOnServerDto): Promise<OutputCreateUserOnServerDto> {
		const userOnServer = UserOnServerFactory.create(input.userId, input.serverId, input.gameUserId, input.nickname);
		await this.userOnServerRepository.create(userOnServer);

		return {
			userId: input.userId,
			serverId: input.serverId,
			gameUserId: input.gameUserId,
			nickname: input.nickname,
		};
	}
}
