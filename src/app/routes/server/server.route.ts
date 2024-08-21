import { type Request, type Response, Router } from "express";
import AddItemToUserUsecaseFactory from "../../../usecase/server/addItemToUser/addProductToUser.server.usecase.factory";
import CreateServerUsecaseFactory from "../../../usecase/server/create/create.server.usecase.factory";
import FindServerUsecaseFactory from "../../../usecase/server/find/find.server.usecase.factory";
import FindAllServerUsecaseFactory from "../../../usecase/server/findAll/findAll.server.usecase.factory";
import findWithParamServerUsecaseFactory from "../../../usecase/server/findWithParam/findWithParam.server.usecase.factory";
import UpdateServerUsecaseFactory from "../../../usecase/server/update/update.server.usecase.factory";

class ServerRoute {
	router: Router;

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get("/findAllServer", this.findAllServer);
		this.router.post("/addItemToUser", this.addItemToUser);
		this.router.post("/createServer", this.createServer);
		this.router.put("/updateServer/:id", this.updateServer);
		this.router.get("/findServer/:id", this.findServer);
		this.router.get("/findServer", this.findServerQueryParam);
	}

	async findAllServer(req: Request, res: Response) {
		const useCase = FindAllServerUsecaseFactory.create();
		try {
			const output = await useCase.execute();
			res.send(output);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).send({ error: error.message });
			}
		}
	}

	async addItemToUser(req: Request, res: Response) {
		const useCase = AddItemToUserUsecaseFactory.create();
		const { token, functionInGame, gameUserId, gameItemName } = req.body;
		const serverDto = {
			token,
			functionInGame,
			gameUserId,
			gameItemName,
		};
		try {
			const output = await useCase.execute(serverDto);
			res.send(output);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).send({ error: error.message });
			}
		}
	}

	async createServer(req: Request, res: Response) {
		const useCase = CreateServerUsecaseFactory.create();
		const { name, serverOwnerId, banner, image, slug } = req.body;
		const serverDto = {
			name,
			slug,
			serverOwnerId,
			banner,
			image,
		};
		try {
			const output = await useCase.execute(serverDto);
			res.send(output);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).send({ error: error.message });
			}
		}
	}

	async updateServer(req: Request, res: Response) {
		const useCase = UpdateServerUsecaseFactory.create();
		const { name, serverOwnerId, banner, image } = req.body;
		const { id } = req.params;
		const serverDto = {
			id,
			name,
			serverOwnerId,
			banner,
			image,
		};
		try {
			const output = await useCase.execute(serverDto);
			res.send(output);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).send({ error: error.message });
			}
		}
	}

	async findServer(req: Request, res: Response) {
		const useCase = FindServerUsecaseFactory.create();
		const { id } = req.params;
		const serverDto = { id };
		try {
			const output = await useCase.execute(serverDto);
			res.send(output);
		} catch (error) {
			if (error instanceof Error) {
				res.status(404).send({ error: error.message });
			}
		}
	}

	async findServerQueryParam(req: Request, res: Response) {
		const useCase = findWithParamServerUsecaseFactory.create();
		const query = req.query as { name?: string; id?: string; slug?: string };
		try {
			const output = await useCase.execute(query);
			res.send(output);
		} catch (error) {
			if (error instanceof Error) {
				res.status(404).send({ error: error.message });
			}
		}
	}
}

export default new ServerRoute().router;
