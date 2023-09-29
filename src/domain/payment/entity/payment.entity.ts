export default class Payment {
  private _id: string;
  private _amount: number;
  private _status: string;

  constructor(id: string, amount: number, status?: string) {
    this._id = id;
    this._amount = amount;
    this._status = status || 'pending';
  }

  approve(): void {
    this._status = 'approved';
  }

  decline(): void {
    this._status = 'declined';
  }

  get amount(): number {
    return this._amount;
  }

  get id(): string {
    return this._id;
  }

  get status(): string {
    return this._status;
  }
}
