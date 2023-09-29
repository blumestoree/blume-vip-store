import ProductFacture from '../../../domain/product/factory/product.factory';
import ProductRepositoryInterface from '../../../domain/product/repositories/product.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputCreateProductDto, OutputCreateProductDto } from './create.product.dto';

export default class CreateProductUseCase
  implements UseCaseInterface<InputCreateProductDto, OutputCreateProductDto>
{
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFacture.create(input.name, input.price, input.serverId);
    await this.productRepository.create(product);

    return {
      productId: product.productId,
      name: product.name,
      price: product.price,
      serverId: product.serverId,
    };
  }
}
