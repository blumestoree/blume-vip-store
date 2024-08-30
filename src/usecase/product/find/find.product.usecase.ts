import type ProductRepositoryInterface from "../../../domain/product/repositories/product.repository.interface";
import type UseCaseInterface from "../../../shared/usecase.interface";
import type { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUseCase implements UseCaseInterface<InputFindProductDto, OutputFindProductDto> {
	constructor(private productRepository: ProductRepositoryInterface) {}

	async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
		const product = await this.productRepository.find(input.id);

		if (!product) {
			throw new Error("Product not found");
		}

		return {
			id: product.id,
			name: product.name,
			gameItemName: product.gameItemName,
			image: product.image,
			price: product.price,
			serverId: product.serverId,
			categoryId: product.categoryId,
		};
	}
}
