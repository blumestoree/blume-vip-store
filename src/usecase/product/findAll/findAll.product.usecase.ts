import type ProductRepositoryInterface from "../../../domain/product/repositories/product.repository.interface";
import type UseCaseInterface from "../../../shared/usecase.interface";
import type { InputFindAllProductDto, OutputFindAllProductDto } from "./findAll.product.dto";

export default class FindAllProductUseCase implements UseCaseInterface<InputFindAllProductDto, OutputFindAllProductDto[]> {
	constructor(private productRepository: ProductRepositoryInterface) {}

	async execute(input: InputFindAllProductDto): Promise<OutputFindAllProductDto[]> {
		const allProducts = await this.productRepository.findAll(input.serverId, input.categoryId, input.sort);

		if (!allProducts) {
			throw new Error("Product not found");
		}

		return allProducts.map((product) => {
			return {
				id: product.id,
				name: product.name,
				gameItemName: product.gameItemName,
				image: product.image,
				price: product.price,
				serverId: product.serverId,
				categoryId: product.categoryId,
			};
		});
	}
}
