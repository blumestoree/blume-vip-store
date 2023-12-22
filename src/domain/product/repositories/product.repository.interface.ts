import Product from '../entity/product.entity';

export default interface ProductRepositoryInterface {
  findProductsByIds(id: string[]): Promise<Product[]>;
  create(entity: Product): Promise<void>;
  update(entity: Product): Promise<void>;
  find(id: string): Promise<Product>;
  findAll(
    serverId: string,
    categoryId: string[] | undefined,
    sort: 'desc' | 'asc' | undefined,
  ): Promise<Product[]>;
}
