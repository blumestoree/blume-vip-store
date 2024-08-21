import type ServerRepositoryInterface from "../../../domain/server/repositories/server.repository.interface";
import type UseCaseInterface from "../../../shared/usecase.interface";
import type { InputFindServerDto, OutputFindServerDto } from "./find.server.dto";

export default class FindServerUseCase implements UseCaseInterface<InputFindServerDto, OutputFindServerDto> {
	constructor(private serverRepository: ServerRepositoryInterface) {}

	async execute(input: InputFindServerDto): Promise<OutputFindServerDto> {
		const server = await this.serverRepository.find(input.id);
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
	}
}
