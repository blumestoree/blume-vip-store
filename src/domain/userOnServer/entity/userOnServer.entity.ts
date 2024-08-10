export default class UserOnServer {
  private _id: string;
  private _user: string;
  private _server: string;
  private _gameUserId: string;
  private _nickname: string;

  constructor(id: string, user: string, server: string, gameUserId: string, nickname: string) {
    this._id = id;
    this._user = user;
    this._server = server;
    this._gameUserId = gameUserId;
    this._nickname = nickname;
  }

  get id(): string {
    return this._id;
  }

  get user(): string {
    return this._user;
  }

  get server(): string {
    return this._server;
  }

  get gameUserId(): string {
    return this._gameUserId;
  }

  get nickname(): string {
    return this._nickname;
  }
}
