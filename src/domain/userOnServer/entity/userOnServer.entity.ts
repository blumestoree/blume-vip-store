export default class UserOnServer {
  private _id: string;
  private _users: string[];
  private _servers: string[];
  private _gameUserId: string;
  private _nickname: string;

  constructor(id: string, users: string[], servers: string[], gameUserId: string, nickname: string) {
    this._id = id;
    this._users = users;
    this._servers = servers;
    this._gameUserId = gameUserId;
    this._nickname = nickname;
  }

  get id(): string {
    return this._id;
  }

  get users(): string[] {
    return this._users;
  }

  get servers(): string[] {
    return this._servers;
  }

  get gameUserId(): string {
    return this._gameUserId;
  }

  get nickname(): string {
    return this._nickname;
  }
}
