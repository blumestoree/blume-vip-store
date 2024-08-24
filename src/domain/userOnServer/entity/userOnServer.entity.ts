export default class UserOnServer {
	private _id: string;
	private _userId: string;
	private _serverId: string;
	private _gameUserId: string;
	private _nickname: string;

	constructor(id: string, userId: string, serverId: string, gameUserId: string, nickname: string) {
		this._id = id;
		this._userId = userId;
		this._serverId = serverId;
		this._gameUserId = gameUserId;
		this._nickname = nickname;
	}

	get id(): string {
		return this._id;
	}

	get userId(): string {
		return this._userId;
	}

	get serverId(): string {
		return this._serverId;
	}

	get gameUserId(): string {
		return this._gameUserId;
	}

	get nickname(): string {
		return this._nickname;
	}
}
