import ProductRepositoryInterface from '../../../domain/product/repositories/product.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { OutputFindAllProductDto } from './findAll.product.dto';

export default class FindAllProductUseCase
  implements UseCaseInterface<undefined, OutputFindAllProductDto>
{
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(): Promise<OutputFindAllProductDto> {
    const allProducts = await this.productRepository.findAll();
    return {
      products: allProducts.map((product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          serverId: product.serverId,
        };
      }),
    };
  }
}
