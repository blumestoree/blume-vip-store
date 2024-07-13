import ProductRepositoryInterface from '../../../domain/product/repositories/product.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputFindProductDto, OutputFindProductDto } from './find.product.dto';

export default class FindProductUseCase
  implements UseCaseInterface<InputFindProductDto, OutputFindProductDto>
{
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    const product = await this.productRepository.find(input.id);

    if (!product) {
      throw new Error('Product not found');
    }

    if (!product.category) {
      throw new Error('Category not found for the product');
    }

    return {
      id: product.id,
      name: product.name,
      gameItemName: product.gameItemName,
      image: product.image,
      price: product.price,
      serverId: product.serverId,
      category:  {
            id: product.category.id,
            name: product.category.name,
            functionInGame: product.category.functionInGame,
          },
    };
  }
}
