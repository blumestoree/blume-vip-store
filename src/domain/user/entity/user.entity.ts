import UserCrypterFactory from '../factory/user.factory.crypter';
import UserValidatorFactory from '../factory/user.factory.validator';

export default class User {
  private _id: string;
  private _name: string;
  private _gameUserId: string;
  private _password: string;
  private _email: string;

  constructor(id: string, name: string, gameUserId: string, email: string, password: string) {
    this._id = id;
    this._name = name;
    this._gameUserId = gameUserId;
    this._password = password;
    this._email = email;
    this._validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get gameUserId(): string {
    return this._gameUserId;
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

  encryptPassword(password: string) {
    this._password = UserCrypterFactory.create().crypter(password);
  }

  private _validate() {
    UserValidatorFactory.create().validate(this);
  }
}
