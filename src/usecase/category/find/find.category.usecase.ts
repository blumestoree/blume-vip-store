import CategoryRepositoryInterface from '../../../domain/category/repositories/category.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputFindCategoryDto, OutputFindCategoryDto } from './find.category.dto';

export default class FindCategoryUseCase
  implements UseCaseInterface<InputFindCategoryDto, OutputFindCategoryDto>
{
  constructor(private CategoryRepository: CategoryRepositoryInterface) {}

  async execute(input: InputFindCategoryDto): Promise<OutputFindCategoryDto> {
    const category = await this.CategoryRepository.find(input.id);
    return {
      id: category.id,
      name: category.name,
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
