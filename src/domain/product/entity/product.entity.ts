import ProductValidatorFactory from '../factory/product.factory.validator';
export default class Product {
  private _id: string;
  private _price: number;
  private _name: string;
  private _serverId: string;

  constructor(id: string, name: string, price: number, serverId: string) {
    (this._name = name),
      (this._price = price),
      (this._serverId = serverId),
      (this._id = id),
      this.validate();
  }

  get id(): string {
    return this._id;
  }

  get serverId(): string {
    return this._serverId;
  }

  get name(): string {
    return this._name;
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
