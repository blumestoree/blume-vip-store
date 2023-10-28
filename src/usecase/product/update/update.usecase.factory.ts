import ProductRepository from '../../../infrastructure/product/repositories/product.repository';
import UpdateproductUseCase from './update.product.usecase';

export default class UpdateProductUsecaseFactory {
  static create() {
    return new UpdateproductUseCase(new ProductRepository());
  }
}
