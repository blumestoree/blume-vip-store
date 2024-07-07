import Product from '../../product/entity/product.entity';
import CategoryValidatorFactory from '../factory/category.factory.validator';
export default class Category {
  private _id: string;
  private _name: string;
  private _functionInGame: string;
  private _serverId: string;
  private _products: Product[];

  constructor(
    id: string,
    name: string,
    functionInGame: string,
    serverId: string,
    products: Product[],
  ) {
    this._id = id;
    this._name = name;
    this._functionInGame = functionInGame;
    this._products = products;
    this._serverId = serverId;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get functionInGame(): string {
    return this._functionInGame;
  }

  get serverId(): string {
    return this._serverId;
  }

  get products(): Product[] {
    return this._products;
  }

  validate() {
    CategoryValidatorFactory.create().validate(this);
  }

  changeName(name: string) {
    this._name = name;
  }
}
