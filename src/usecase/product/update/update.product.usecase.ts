import ProductRepositoryInterface from '../../../domain/product/repositories/product.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputUpdateServerDto, OutputCreateServerDto } from './update.product.dto';

export default class UpdateproductUseCase
  implements UseCaseInterface<InputUpdateServerDto, OutputCreateServerDto>
{
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputUpdateServerDto): Promise<OutputCreateServerDto> {
    const product = await this.productRepository.find(input.productId);
    product.changeName(input.name);

    await this.productRepository.update(product);

    return {
      productId: product.productId,
      name: product.name,
      price: product.price,
      serverId: product.serverId,
    };
  }
}
