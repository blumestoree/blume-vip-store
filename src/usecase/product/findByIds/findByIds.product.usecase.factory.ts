import ProductRepository from '../../../infrastructure/product/repositories/product.repository';
import FindProductsByIdsUseCase from './findByIds.product.usecase';

export default class FindByIdsAllProductUsecaseFactory {
  static create() {
    return new FindProductsByIdsUseCase(new ProductRepository());
  }
}
