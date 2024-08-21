import type ServerRepositoryInterface from "../../../domain/server/repositories/server.repository.interface";
import type UseCaseInterface from "../../../shared/usecase.interface";
import type { InputFindWithParamServerDto, OutputFindWithParamServerDto } from "./findWithParam.server.dto";

export default class FfndWithParamServerUseCase
	implements UseCaseInterface<InputFindWithParamServerDto, OutputFindWithParamServerDto[]>
{
	constructor(private serverRepository: ServerRepositoryInterface) {}

	async execute(input: InputFindWithParamServerDto) {
		const allServers = await this.serverRepository.findWithParam(input);
		return allServers.map((server) => {
			return {
				id: server.id,
				name: server.name,
				slug: server.slug,
				image: server.image,
				banner: server.banner,
				serverOwnerId: server.serverOwnerId,
				products: server.products,
				categories: server.categories,
			};
		});
	}
}
