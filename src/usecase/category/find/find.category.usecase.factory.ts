import CategoryRepository from '../../../infrastructure/category/repositories/category.repository';
import FindCategoryUseCase from './find.category.usecase';

export default class FindCategoryUsecaseFactory {
  static create() {
    return new FindCategoryUseCase(new CategoryRepository());
  }
}
