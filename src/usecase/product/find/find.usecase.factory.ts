import ProductRepository from '../../../infrastructure/product/repositories/product.repository';
import FindProductUseCase from './find.product.usecase';

export default class FindByIdProductUsecaseFactory {
  static create() {
    return new FindProductUseCase(new ProductRepository());
  }
}
