import type ServerRepositoryInterface from "../../../domain/server/repositories/server.repository.interface";
import type UseCaseInterface from "../../../shared/usecase.interface";
import type { InputFindWithParamServerDto, OutputFindWithParamServerDto } from "./findWithParam.server.dto";

export default class FfndWithParamServerUseCase
	implements UseCaseInterface<InputFindWithParamServerDto, OutputFindWithParamServerDto>
{
	constructor(private serverRepository: ServerRepositoryInterface) {}

	async execute(input: InputFindWithParamServerDto) {
		const allServers = await this.serverRepository.findWithParam(input);
		return {
			id: allServers.id,
			name: allServers.name,
			slug: allServers.slug,
			image: allServers.image,
			banner: allServers.banner,
			serverOwnerId: allServers.serverOwnerId,
			products: allServers.products,
			categories: allServers.categories,
		};
	}
}
