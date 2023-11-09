import CategoryFactory from '../../../domain/category/factory/category.factory';
import CategoryRepositoryInterface from '../../../domain/category/repositories/category.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputCategoryDto, OutputCategoryDto } from './create.category.dto';

export default class CreateCategoryUseCase
  implements UseCaseInterface<InputCategoryDto, OutputCategoryDto>
{
  constructor(private CategoryRepository: CategoryRepositoryInterface) {}

  async execute(input: InputCategoryDto): Promise<OutputCategoryDto> {
    const category = CategoryFactory.create(input.name);
    await this.CategoryRepository.create(category);

    return {
      id: category.id,
      name: category.name,
    };
  }
}
