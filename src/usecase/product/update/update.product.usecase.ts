import ProductRepositoryInterface from '../../../domain/product/repositories/product.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputUpdateProductDto, OutputCreateProductDto } from './update.product.dto';

export default class UpdateproductUseCase
  implements UseCaseInterface<InputUpdateProductDto, OutputCreateProductDto>
{
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: InputUpdateProductDto): Promise<OutputCreateProductDto> {
    const product = await this.productRepository.find(input.id);
    product.changeName(input.name);

    await this.productRepository.update(product);

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
