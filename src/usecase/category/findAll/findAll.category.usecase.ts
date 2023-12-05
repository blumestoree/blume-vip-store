import CategoryRepositoryInterface from '../../../domain/category/repositories/category.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputFindAllCategoryDto, OutputFindAllCategoryDto } from './findAll.category.dto';

export default class FindAllCategoryUseCase
  implements UseCaseInterface<InputFindAllCategoryDto, OutputFindAllCategoryDto[]>
{
  constructor(private categoryRepository: CategoryRepositoryInterface) {}

  async execute(input: InputFindAllCategoryDto): Promise<OutputFindAllCategoryDto[]> {
    const allCategories = await this.categoryRepository.findAll(input.serverId);
    return allCategories.map((category) => {
      return {
        id: category.id,
        name: category.name,
        serverId: category.serverId,
        products:
          category.products?.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
          })) || [],
      };
    });
  }
}
