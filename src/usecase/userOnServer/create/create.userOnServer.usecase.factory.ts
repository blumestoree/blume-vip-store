import UserOnServerRepository from "../../../infrastructure/userOnServer/repositories/userOnServer.repository";
import UserOnServerUseCase from "./create.userOnServer.usecase";

export default class CreateUserOnServerUsecaseFactory {
	static create() {
		return new UserOnServerUseCase(new UserOnServerRepository());
	}
}
