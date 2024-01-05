import CategoryRepositoryInterface from '../../../domain/category/repositories/category.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputUpdateCategoryDto, OutputCreateCategoryDto } from './update.category.dto';

export default class UpdateCategoryUseCase
  implements UseCaseInterface<InputUpdateCategoryDto, OutputCreateCategoryDto>
{
  constructor(private categoryRepository: CategoryRepositoryInterface) {}

  async execute(input: InputUpdateCategoryDto): Promise<OutputCreateCategoryDto> {
    const category = await this.categoryRepository.find(input.id);
    category.changeName(input.name);

    await this.categoryRepository.update(category);

    return {
      id: category.id,
      name: category.name,
      functionInGame: category.functionInGame,
      serverId: category.serverId,
      products:
        category.products?.map((product) => ({
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          serverId: product.serverId,
          categoryId: product.categoryId,
        })) || [],
    };
  }
}
