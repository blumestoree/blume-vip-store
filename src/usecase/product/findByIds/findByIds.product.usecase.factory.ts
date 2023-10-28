import ProductRepository from '../../../infrastructure/product/repositories/product.repository';
import FindProductUseCase from '../find/find.product.usecase';

export default class FindByIdsAllProductUsecaseFactory {
  static create() {
    return new FindProductUseCase(new ProductRepository());
  }
}
