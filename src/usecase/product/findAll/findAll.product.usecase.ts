import ProductRepositoryInterface from '../../../domain/product/repositories/product.repository.interface';
import { OutputFindAllProductDto } from './findAll.product.dto';

export default class FindAllProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(): Promise<OutputFindAllProductDto> {
    const allProducts = await this.productRepository.findAll();
    return {
      products: allProducts.map((product) => {
        return {
          productId: product.productId,
          name: product.name,
          price: product.price,
          serverId: product.serverId,
        };
      }),
    };
  }
}
