import Category from '../entity/category.entity';
import CategoryValidator from '../validator/category.validator';
import ValidatorInterface from '../../../shared/validator.interface';

export default class CategoryValidatorFactory {
  static create(): ValidatorInterface<Category> {
    return new CategoryValidator();
  }
}
