import ProductRepositoryInterface from '../../../domain/product/repositories/product.repository.interface';
import { InputFindProductDto, OutputFindProductDto } from './find.product.dto';

export default class FindProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    const product = await this.productRepository.find(input.productId);
    return {
      productId: product.productId,
      name: product.name,
      price: product.price,
      serverId: product.serverId,
    };
  }
}
