import { v4 as uuid } from "uuid";
import Server from "../entity/server.entity";

export default class ServerFactory {
	static create(
		name: string,
		slug: string,
		image: string,
		banner: string[],
		serverOwnerId: string,
		id?: string,
		products?: string[],
		categories?: string[],
		userOnServer?: string[],
	): Server {
		return new Server(
			id || uuid(),
			name,
			slug,
			image,
			banner,
			serverOwnerId,
			products || [],
			categories || [],
			userOnServer || [],
		);
	}
}
