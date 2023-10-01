export default class User {
  private _userId: string;
  private _name: string;
  private _password: string;
  private _email: string;

  constructor(userId: string, name: string, password: string, email: string) {
    this._userId = userId;
    this._name = name;
    this._password = password;
    this._email = email;
  }

  get userId(): string {
    return this._userId;
  }

  get name(): string {
    return this._name;
  }

  get password(): string {
    return this._password;
  }

  get email(): string {
    return this._email;
  }

  changeName(name: string) {
    this._name = name;
  }
}
