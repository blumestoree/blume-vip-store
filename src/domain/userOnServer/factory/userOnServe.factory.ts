import { v4 as uuid } from "uuid";
import type Server from "../../server/entity/server.entity";
import userOnServer from "../entity/userOnServer.entity";

export default class UserOnServerFactory {
	static create(user: string, server: Server, gameUserId: string, nickname: string, id?: string): userOnServer {
		return new userOnServer(id || uuid(), user, server, gameUserId, nickname);
	}
}
