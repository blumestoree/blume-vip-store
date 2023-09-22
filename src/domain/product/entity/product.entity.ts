import ProductValidatorFactory from '../factory/product.factory.validator';
export default class Product {
  private _productId: string;
  private _price: number;
  private _name: string;
  private _serverId: number;

  constructor(productId: string, name: string, price: number, serverId: number) {
    (this._productId = productId),
      (this._name = name),
      (this._price = price),
      (this._serverId = serverId),
      this.validate();
  }

  get productId(): string {
    return this._productId;
  }

  get serverId(): number {
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
