import Product from '../entity/product.entity';
import ProductValidator from '../validator/product.validator';
import ValidatorInterface from '../../../shared/validator.interface';

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<Product> {
    return new ProductValidator();
  }
}
