import RepositoryInterface from '../../../shared/repository.interface';
import Product from '../entity/product.entity';

export default interface ProductRepositoryInterface extends RepositoryInterface<Product> {
  findProductsByIds(id: string[]): Promise<Product[]>;
}
