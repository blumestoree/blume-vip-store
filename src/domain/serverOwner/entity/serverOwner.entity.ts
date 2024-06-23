import ServerOwnerValidatorFactory from '../factory/serverOwner.factory.validator';
import ServerOwnerCrypterFactory from '../factory/serverOwner.factory.crypter';
export default class ServerOwner {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _servers: string[];

  constructor(id: string, name: string, email: string, password: string, servers: string[]) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._servers = servers;
    this._password = ServerOwnerCrypterFactory.create().crypter(password);
    this._validate();
  }

  get id(): string {
    return this._id;
  }

  get servers(): string[] {
    return this._servers;
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

  private _validate() {
    ServerOwnerValidatorFactory.create().validate(this);
  }

  // addServer(serverId: string) {
  //   this._serverId = serverId;
  // }
}
