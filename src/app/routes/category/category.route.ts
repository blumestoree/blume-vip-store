import { type Request, type Response, Router } from "express";
import CreateCategoryUsecaseFactory from "../../../usecase/category/create/create.category.usecase.factory";
import FindCategoryUsecaseFactory from "../../../usecase/category/find/find.category.usecase.factory";
import FindAllCategoryUsecaseFactory from "../../../usecase/category/findAll/findAll.category.usecase.factory";
import UpdateCategoryUsecaseFactory from "../../../usecase/category/update/update.category.usecase.factory";

class CategoryRoute {
	router: Router;

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get("/findAllCategory", this.findAllCategory);
		this.router.post("/createCategory", this.createCategory);
		this.router.put("/updateCategory:id", this.updateCategory);
		this.router.get("/findCategory/:id", this.findCategory);
	}

	async findAllCategory(req: Request, res: Response) {
		const { serverId } = req.query;
		const useCase = FindAllCategoryUsecaseFactory.create();
		const serverDto = { serverId: serverId as string };
		try {
			const output = await useCase.execute(serverDto);
			res.send(output);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).send({ error: error.message });
			}
		}
	}

	async createCategory(req: Request, res: Response) {
		const useCase = CreateCategoryUsecaseFactory.create();
		const { name, serverId, functionInGame } = req.body;
		const serverDto = {
			name,
			functionInGame,
			serverId,
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

	async updateCategory(req: Request, res: Response) {
		const useCase = UpdateCategoryUsecaseFactory.create();
		const { name, serverId, functionInGame } = req.body;
		const { id } = req.params;
		const serverDto = {
			id,
			name,
			functionInGame,
			serverId,
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

	async findCategory(req: Request, res: Response) {
		const useCase = FindCategoryUsecaseFactory.create();
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
}

export default new CategoryRoute().router;
