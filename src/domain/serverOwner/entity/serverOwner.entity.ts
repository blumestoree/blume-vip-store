import ServerOwnerValidatorFactory from '../factory/serverOwner.factory.validator';
import ServerOwnerCrypterFactory from '../factory/serverOwner.factory.crypter';
export default class ServerOwner {
  private _serverOwnerId: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _serverId?: number;

  constructor(
    serverOwnerId: string,
    name: string,
    email: string,
    password: string,
    serverId?: number,
  ) {
    (this._serverOwnerId = serverOwnerId),
      (this._name = name),
      (this._email = email),
      (this._serverId = serverId),
      (this._password = ServerOwnerCrypterFactory.create().crypter(password));
    this.validate();
  }

  get serverOwnerId(): string {
    return this._serverOwnerId;
  }

  get serverId(): number | undefined {
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

  addServer(serverId: number) {
    this._serverId = serverId;
  }
}
