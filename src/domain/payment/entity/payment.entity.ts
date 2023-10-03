export default class Payment {
  private _id: string;
  private _amount: number;
  private _userId: string;
  private _productId: string;

  constructor(id: string, amount: number, userId: string, productId: string) {
    this._id = id;
    this._amount = amount;
    this._userId = userId;
    this._productId = productId;
  }

  get id(): string {
    return this._id;
  }

  get amount(): number {
    return this._amount;
  }

  get userId(): string {
    return this._userId;
  }

  get productId(): string {
    return this._productId;
  }
}
