import Category from '../../category/entity/category.entity';
import ProductValidatorFactory from '../factory/product.factory.validator';
export default class Product {
  private _id: string;
  private _price: number;
  private _name: string;
  private _categoryId: string;
  private _category?: Category;
  private _image: string;
  private _serverId: string;
  private _gameItemName: string;

  constructor(
    id: string,
    name: string,
    gameItemName: string,
    categoryId: string,
    image: string,
    price: number,
    serverId: string,
    category?: Category,
  ) {
    this._name = name;
    this._gameItemName = gameItemName;
    this._price = price;
    this._image = image;
    this._serverId = serverId;
    this._categoryId = categoryId;
    this._category = category;
    this._id = id;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get serverId(): string {
    return this._serverId;
  }

  get image(): string {
    return this._image;
  }

  get gameItemName(): string {
    return this._gameItemName;
  }

  get name(): string {
    return this._name;
  }

  get categoryId(): string {
    return this._categoryId;
  }

  get category(): Category | undefined {
    return this._category;
  }

  get price(): number {
    return this._price;
  }

  validate() {
    ProductValidatorFactory.create().validate(this);
  }

  changeName(name: string) {
    this._name = name;
  }
}
