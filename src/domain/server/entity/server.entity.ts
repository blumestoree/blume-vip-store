import ServerOwnerValidatorFactory from '../factory/server.factory.validator';
export default class Server {
  private _serverId: string;
  private _name: string;

  constructor(serverId: string, name: string) {
    (this._serverId = serverId), (this._name = name), this.validate();
  }

  get serverId(): string {
    return this._serverId;
  }

  get name(): string {
    return this._name;
  }

  validate() {
    ServerOwnerValidatorFactory.create().validate(this);
  }

  changeName(name: string) {
    this._name = name;
  }
}
