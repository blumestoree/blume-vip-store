import UserOnServerFacade from "../../../domain/userOnServer/facade/userOnServer.facade";
import UserRepository from "../../../infrastructure/user/repositories/user.repository";
import CreateUserOnServerUseCase from "../../userOnServer/create/create.userOnServer.usecase.factory";
import CreateUserUseCase from "./create.user.usecase";

export default class CreateUserUsecaseFactory {
	static create() {
		const useCaseUserOnServer = CreateUserOnServerUseCase.create();

		const facadeCreateUserOnServer = new UserOnServerFacade({ createUserOnServerUseCase: useCaseUserOnServer });

		return new CreateUserUseCase(new UserRepository(), facadeCreateUserOnServer);
	}
}
