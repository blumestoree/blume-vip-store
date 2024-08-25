import ServerFacade from "../../../domain/server/facade/server.facade";
import UserOnServerRepository from "../../../infrastructure/userOnServer/repositories/userOnServer.repository";
import FindServerUsecaseFactory from "../../server/find/find.server.usecase.factory";
import UserOnServerUseCase from "./create.userOnServer.usecase";
export default class CreateUserOnServerUsecaseFactory {
	static create() {
		const useCaseUserOnServer = FindServerUsecaseFactory.create();
		const facadeCreateServer = new ServerFacade({ findServerUseCase: useCaseUserOnServer });
		return new UserOnServerUseCase(new UserOnServerRepository(), facadeCreateServer);
	}
}
