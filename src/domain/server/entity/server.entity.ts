import ServerValidatorFactory from '../factory/server.factory.validator';
export default class Server {
  private _serverId: string;
  private _name: string;
  private _serverOwnerId: number;

  constructor(serverId: string, name: string, serverOwnerId: number) {
    (this._serverId = serverId),
      (this._name = name),
      (this._serverOwnerId = serverOwnerId),
      this.validate();
  }

  get serverId(): string {
    return this._serverId;
  }

  get serverOwnerId(): number {
    return this._serverOwnerId;
  }

  get name(): string {
    return this._name;
  }

  validate() {
    ServerValidatorFactory.create().validate(this);
  }

  changeName(name: string) {
    this._name = name;
  }
}
