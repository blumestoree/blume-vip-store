export default class AuthToken {
  private _id: string;
  private _expiresIn: number;
  private _userId: string;

  constructor(id: string, expiresIn: number, userId: string) {
    (this._expiresIn = expiresIn), (this._userId = userId), (this._id = id);
  }

  get id(): string {
    return this._id;
  }

  get expiresIn(): number {
    return this._expiresIn;
  }

  get userId(): string {
    return this._userId;
  }
}
