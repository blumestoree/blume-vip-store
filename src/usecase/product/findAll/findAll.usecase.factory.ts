import ProductRepository from '../../../infrastructure/product/repositories/product.repository';
import FindAllProductUseCase from '../findAll/findAll.product.usecase';

export default class FindAllProductUsecaseFactory {
  static create() {
    return new FindAllProductUseCase(new ProductRepository());
  }
}
