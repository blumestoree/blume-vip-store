import UserFactory from "../../../domain/user/factory/user.factory";
import type UserRepositoryInterface from "../../../domain/user/repositories/user.repository";
import type UserOnServerFacadeInterface from "../../../domain/userOnServer/facade/userOnServer.facade.interface";
import UserOnServerFactory from "../../../domain/userOnServer/factory/userOnServe.factory";
import type UseCaseInterface from "../../../shared/usecase.interface";
import AuthTokenUsecaseFactory from "../../authToken/factory/authToken.usecase.factory";
import type { InputCreateUserDto, OutputCreateUserDto } from "./create.user.dto";

export default class CreateUserUseCase implements UseCaseInterface<InputCreateUserDto, OutputCreateUserDto> {
	constructor(
		private userRepository: UserRepositoryInterface,
		private createUserOnServer: UserOnServerFacadeInterface,
	) {}

	async execute(input: InputCreateUserDto): Promise<OutputCreateUserDto> {
		const user = UserFactory.create(input.name, input.email, input.password);

		const userOnServerFacadeDto = {
			userId: user.id,
			serverId: input.serverId,
			gameUserId: input.gameUserId,
			nickname: input.nickname,
		};

		user.encryptPassword(input.password);
		await this.userRepository.create(user);

		const userOnServer = await this.createUserOnServer.createUserOnServer(userOnServerFacadeDto);
		// console.log("userOnServer", userOnServer);

		const token = AuthTokenUsecaseFactory.create().createToken(user.name);
		const refreshToken = await AuthTokenUsecaseFactory.create().createRefreshToken(user.id);

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			token,
			refreshToken,
		};
	}
}
