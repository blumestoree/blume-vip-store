import Owner from '../entity/product.entity';
import Server from '../entity/product.entity';
import { v4 as uuid } from 'uuid';

export default class ProductFacture {
  static create(name: string, price: number, serverId: number, id?: string): Server {
    return new Owner(id || uuid(), name, price, serverId);
  }
}
