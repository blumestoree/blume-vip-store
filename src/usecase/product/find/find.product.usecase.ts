import ProductRepositoryInterface from '../../../domain/product/repositories/product.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputFindProductDto, OutputFindProductDto } from './find.product.dto';

export default class FindProductUseCase
  implements UseCaseInterface<InputFindProductDto, OutputFindProductDto>
{
  constructor(private productRepository: ProductRepositoryInterface) {}

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
