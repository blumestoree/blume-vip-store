import type UseCaseInterface from "../../../shared/usecase.interface";
import type UserOnServerFacadeInterface from "./userOnServer.facade.interface";
import type { InputCreateUserOnServerFacadeDto, OutputCreateUserOnServerFacadeDto } from "./userOnServer.facade.interface";

interface UserOnServerUseCases {
	createUserOnServerUseCase?: UseCaseInterface<InputCreateUserOnServerFacadeDto, OutputCreateUserOnServerFacadeDto>;
}

export default class UserOnServerFacade implements UserOnServerFacadeInterface {
	constructor(private useCases: UserOnServerUseCases) {}

	createUserOnServer(input: InputCreateUserOnServerFacadeDto) {
		if (!this.useCases.createUserOnServerUseCase) {
			throw new Error("createUserOnServerUseCase não está disponível.");
		}
		return this.useCases.createUserOnServerUseCase.execute(input);
	}
}
