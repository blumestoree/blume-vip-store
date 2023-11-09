import CategoryRepositoryInterface from '../../../domain/category/repositories/category.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { OutputFindAllCategoryDto } from './findAll.category.dto';

export default class FindAllCategoryUseCase
  implements UseCaseInterface<undefined, OutputFindAllCategoryDto[]>
{
  constructor(private categoryRepository: CategoryRepositoryInterface) {}

  async execute(): Promise<OutputFindAllCategoryDto[]> {
    const allCategories = await this.categoryRepository.findAll();
    return allCategories.map((category) => {
      return {
        id: category.id,
        name: category.name,
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
