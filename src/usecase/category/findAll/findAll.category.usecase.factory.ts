import CategoryRepository from '../../../infrastructure/category/repositories/category.repository';
import FindAllCategoryUseCase from './findAll.category.usecase';

export default class FindAllCategoryUsecaseFactory {
  static create() {
    return new FindAllCategoryUseCase(new CategoryRepository());
  }
}
