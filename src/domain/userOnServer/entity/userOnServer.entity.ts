import type Server from "../../server/entity/server.entity";
export default class UserOnServer {
	private _id: string;
	private _userId: string;
	private _server: Server;
	private _gameUserId: string;
	private _nickname: string;

	constructor(id: string, userId: string, server: Server, gameUserId: string, nickname: string) {
		this._id = id;
		this._userId = userId;
		this._server = server;
		this._gameUserId = gameUserId;
		this._nickname = nickname;
	}

	get id(): string {
		return this._id;
	}

	get userId(): string {
		return this._userId;
	}

	get server(): Server {
		return this._server;
	}

	get gameUserId(): string {
		return this._gameUserId;
	}

	get nickname(): string {
		return this._nickname;
	}
}
