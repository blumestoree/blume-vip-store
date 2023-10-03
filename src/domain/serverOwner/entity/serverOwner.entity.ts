import ServerOwnerValidatorFactory from '../factory/serverOwner.factory.validator';
import ServerOwnerCrypterFactory from '../factory/serverOwner.factory.crypter';
export default class ServerOwner {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _serverId?: string;

  constructor(id: string, name: string, email: string, password: string, serverId?: string) {
    (this._id = id),
      (this._name = name),
      (this._email = email),
      (this._serverId = serverId),
      (this._password = ServerOwnerCrypterFactory.create().crypter(password));
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get serverId(): string | undefined {
    return this._serverId;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  changeName(name: string) {
    this._name = name;
  }

  validate() {
    ServerOwnerValidatorFactory.create().validate(this);
  }

  addServer(serverId: string) {
    this._serverId = serverId;
  }
}
