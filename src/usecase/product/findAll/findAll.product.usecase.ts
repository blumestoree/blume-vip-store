import ProductRepositoryInterface from '../../../domain/product/repositories/product.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputFindAllProductDto, OutputFindAllProductDto } from './findAll.product.dto';

export default class FindAllProductUseCase
  implements UseCaseInterface<InputFindAllProductDto, OutputFindAllProductDto[]>
{
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: InputFindAllProductDto): Promise<OutputFindAllProductDto[]> {
    const allProducts = await this.productRepository.findAll(
      input.serverId,
      input.categoryId,
      input.sort,
    );
    return allProducts.map((product) => {
      return {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        serverId: product.serverId,
        categoryId: product.categoryId,
        category: product.category
          ? {
              id: product.category.id,
              name: product.category.name,
            }
          : null,
      };
    });
  }
}
