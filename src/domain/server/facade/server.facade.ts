import type UseCaseInterface from "../../../shared/usecase.interface";
import type ServerFacadeInterface from "./server.facade.interface";
import type { InputFindServerFacadeDto, OutputFindServerFacadeDto } from "./server.facade.interface";

interface ServerUseCases {
	findServerUseCase?: UseCaseInterface<InputFindServerFacadeDto, OutputFindServerFacadeDto>;
}

export default class ServerFacade implements ServerFacadeInterface {
	constructor(private useCases: ServerUseCases) {}

	findServer(input: InputFindServerFacadeDto) {
		if (!this.useCases.findServerUseCase) {
			throw new Error("serverUseCase não está disponível.");
		}
		return this.useCases.findServerUseCase.execute(input);
	}
}
