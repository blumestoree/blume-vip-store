import Category from '../entity/category.entity';
import { v4 as uuid } from 'uuid';

export default class CategoryFactory {
  static create(name: string, id?: string): Category {
    return new Category(id || uuid(), name);
  }
}
