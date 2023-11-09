import CategoryValidatorFactory from '../factory/category.factory.validator';

export default class Category {
  private _id: string;
  private _name: string;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  validate() {
    CategoryValidatorFactory.create().validate(this);
  }

  changeName(name: string) {
    this._name = name;
  }
}
