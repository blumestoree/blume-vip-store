import ProductRepositoryInterface from '../../../domain/product/repositories/product.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputFindProductDto, OutputFindProductDto } from './find.product.dto';

export default class FindProductUseCase
  implements UseCaseInterface<InputFindProductDto, OutputFindProductDto>
{
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    const product = await this.productRepository.find(input.id);
    return {
      id: product.id,
      name: product.name,
      gameItemName: product.gameItemName,
      image: product.image,
      price: product.price,
      categoryId: product.categoryId,
      serverId: product.serverId,
      category: product.category
        ? {
            id: product.category.id,
            name: product.category.name,
          }
        : null,
    };
  }
}
