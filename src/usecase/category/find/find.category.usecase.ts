import type CategoryRepositoryInterface from "../../../domain/category/repositories/category.repository.interface";
import type UseCaseInterface from "../../../shared/usecase.interface";
import type { InputFindCategoryDto, OutputFindCategoryDto } from "./find.category.dto";

export default class FindCategoryUseCase implements UseCaseInterface<InputFindCategoryDto, OutputFindCategoryDto> {
	constructor(private CategoryRepository: CategoryRepositoryInterface) {}

	async execute(input: InputFindCategoryDto): Promise<OutputFindCategoryDto> {
		const category = await this.CategoryRepository.find(input.id, input.serverId);
		return {
			id: category.id,
			name: category.name,
			functionInGame: category.functionInGame,
			serverId: category.serverId,
			products: category.products?.map((product) => ({
				id: product.id,
				name: product.name,
				image: product.image,
				price: product.price,
				serverId: product.serverId,
				gameItemName: product?.gameItemName,
			})),
		};
	}
}
