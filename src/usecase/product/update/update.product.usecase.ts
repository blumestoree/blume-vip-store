import ProductRepositoryInterface from '../../../domain/product/repositories/product.repository.interface';
import { InputUpdateServerDto, InputCreateServerDto } from './update.product.dto';

export default class UpdateproductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputUpdateServerDto): Promise<InputCreateServerDto> {
    const product = await this.productRepository.find(input.productId);
    product.changeName(input.name);

    await this.productRepository.update(product);

    return {
      productId: product.productId,
      name: product.name,
      price: product.price,
    };
  }
}
