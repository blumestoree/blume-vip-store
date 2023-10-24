import ServerValidatorFactory from '../factory/server.factory.validator';
export default class Server {
  private _id: string;
  private _name: string;
  private _serverOwnerId: string;

  constructor(id: string, name: string, serverOwnerId: string) {
    this._name = name;
    this._serverOwnerId = serverOwnerId;
    this._id = id;
    this._validate();
  }

  get id(): string {
    return this._id;
  }

  get serverOwnerId(): string {
    return this._serverOwnerId;
  }

  get name(): string {
    return this._name;
  }

  private _validate() {
    ServerValidatorFactory.create().validate(this);
  }

  changeName(name: string) {
    this._name = name;
  }
}
