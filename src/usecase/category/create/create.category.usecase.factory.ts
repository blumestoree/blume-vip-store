import CategoryRepository from '../../../infrastructure/category/repositories/category.repository';
import CreateCategoryUseCase from './create.category.usecase';

export default class CreateCategoryUsecaseFactory {
  static create() {
    return new CreateCategoryUseCase(new CategoryRepository());
  }
}
