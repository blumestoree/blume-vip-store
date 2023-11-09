import CategoryRepository from '../../../infrastructure/category/repositories/category.repository';
import UpdateCategoryUseCase from './update.category.usecase';

export default class UpdateCategoryUsecaseFactory {
  static create() {
    return new UpdateCategoryUseCase(new CategoryRepository());
  }
}
