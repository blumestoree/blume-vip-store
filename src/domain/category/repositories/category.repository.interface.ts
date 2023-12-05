import Category from '../entity/category.entity';
export default interface CategoryRepositoryInterface {
  create(entity: Category): Promise<void>;
  update(entity: Category): Promise<void>;
  find(id: string): Promise<Category>;
  findAll(serverId: string): Promise<Category[]>;
}
