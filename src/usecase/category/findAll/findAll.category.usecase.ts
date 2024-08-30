import type CategoryRepositoryInterface from "../../../domain/category/repositories/category.repository.interface";
import type UseCaseInterface from "../../../shared/usecase.interface";
import type { InputFindAllCategoryDto, OutputFindAllCategoryDto } from "./findAll.category.dto";

export default class FindAllCategoryUseCase implements UseCaseInterface<InputFindAllCategoryDto, OutputFindAllCategoryDto[]> {
	constructor(private categoryRepository: CategoryRepositoryInterface) {}

	async execute(input: InputFindAllCategoryDto): Promise<OutputFindAllCategoryDto[]> {
		const allCategories = await this.categoryRepository.findAll(input.serverId);
		return allCategories.map((category) => {
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
					categoryId: product.categoryId,
				})),
			};
		});
	}
}
