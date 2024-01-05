import ProductRepositoryInterface from '../../../domain/product/repositories/product.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputFindProductsByIdsDto, OutpuFfindProductsByIdsDto } from './findByIds.product.dto';

export default class FindProductsByIdsUseCase
  implements UseCaseInterface<InputFindProductsByIdsDto, OutpuFfindProductsByIdsDto[]>
{
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: InputFindProductsByIdsDto): Promise<OutpuFfindProductsByIdsDto[]> {
    const product = await this.productRepository.findProductsByIds(input.id);

    return product.map((product) => {
      return {
        id: product.id,
        name: product.name,
        gameItemName: product.gameItemName,
        image: product.image,
        price: product.price,
        serverId: product.serverId,
        categoryId: product.categoryId,
        category: product.category
          ? {
              id: product.category.id,
              name: product.category.name,
            }
          : null,
      };
    });
  }
}
