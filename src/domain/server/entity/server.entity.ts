import ServerValidatorFactory from '../factory/server.factory.validator';
export default class Server {
  private _id: string;
  private _name: string;
  private _image: string;
  private _banner: string[];
  private _serverOwnerId: string;
  private _product: string[];
  private _category: string[];

  constructor(id: string, name: string, image: string, banner: string[], serverOwnerId: string, product: string[], category: string[]) {
    this._id = id;
    this._name = name;
    this._image = image;
    this._banner = banner;
    this._serverOwnerId = serverOwnerId;
    this._product = product
    this._category = category
    this._validate();
  }

  get id(): string {
    return this._id;
  }

  get image(): string {
    return this._image;
  }

  get product(): string[] {
    return this._product;
  }

  get category(): string[] {
    return this._category;
  }

  get banner(): string[] {
    return this._banner;
  }

  get serverOwnerId(): string {
    return this._serverOwnerId;
  }

  get name(): string {
    return this._name;
  }

  private _validate() {
    ServerValidatorFactory.create().validate(this);
  }

  changeName(name: string) {
    this._name = name;
  }
}
