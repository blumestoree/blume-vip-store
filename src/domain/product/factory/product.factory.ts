import Category from '../../category/entity/category.entity';
import Product from '../entity/product.entity';
import { v4 as uuid } from 'uuid';

export default class ProductFactory {
  static create(
    name: string,
    gameItemName: string,
    image: string,
    price: number,
    serverId: string,
    category: Category,
    paymentsId: string[],
    id?: string,
  ): Product {
    return new Product(
      id || uuid(),
      name,
      gameItemName,
      image,
      price,
      serverId,
      category,
      paymentsId
    );
  }
}
