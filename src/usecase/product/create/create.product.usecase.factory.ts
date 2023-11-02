import ProductRepository from '../../../infrastructure/product/repositories/product.repository';
import CreateProductUseCase from './create.product.usecase';
import SaveImageCloud from './saveImageCloud.ts/saveImage';

export default class CreateProductUsecaseFactory {
  static create() {
    return new CreateProductUseCase(new ProductRepository(), new SaveImageCloud());
  }
}
