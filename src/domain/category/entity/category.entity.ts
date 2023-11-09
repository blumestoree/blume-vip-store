import Product from '../../product/entity/product.entity';
import CategoryValidatorFactory from '../factory/category.factory.validator';

export default class Category {
  private _id: string;
  private _name: string;
  private _products?: Product[];

  constructor(id: string, name: string, products?: Product[]) {
    this._id = id;
    this._name = name;
    this._products = products;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get products(): Product[] | undefined {
    return this._products;
  }

  validate() {
    CategoryValidatorFactory.create().validate(this);
  }

  changeName(name: string) {
    this._name = name;
  }
}
