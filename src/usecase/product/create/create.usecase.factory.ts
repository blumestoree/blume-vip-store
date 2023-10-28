import ProductRepository from '../../../infrastructure/product/repositories/product.repository';
import CreateProductUseCase from './create.product.usecase';

export default class CreateProductUsecaseFactory {
  static create() {
    return new CreateProductUseCase(new ProductRepository());
  }
}
