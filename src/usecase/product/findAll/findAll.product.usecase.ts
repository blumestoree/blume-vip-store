import ProductRepositoryInterface from '../../../domain/product/repositories/product.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputFindAllProductDto, OutputFindAllProductDto } from './findAll.product.dto';

export default class FindAllProductUseCase
  implements UseCaseInterface<InputFindAllProductDto, OutputFindAllProductDto[]>
{
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: InputFindAllProductDto): Promise<OutputFindAllProductDto[]> {
    const allProducts = await this.productRepository.findAll(
      input.serverId,
      input.categoryId,
      input.sort,
    );

    if (!allProducts) {
      throw new Error('Product not found');
    }

    return allProducts.map((product) => {
      
      if (!product.category) {
        throw new Error(`Category not found for product with id ${product.id}`);
      }

      return {
        id: product.id,
        name: product.name,
        gameItemName: product.gameItemName,
        image: product.image,
        price: product.price,
        serverId: product.serverId,
        category: {
          id: product.category.id,
          name: product.category.name,
          functionInGame: product.category.functionInGame,
        }
      };
    });
  }
}
