import { type Request, type Response, Router } from "express";
import CreateUserUsecaseFactory from "../../../usecase/user/create/create.user.usecase.factory";
import FindUserUsecaseFactory from "../../../usecase/user/find/find.user.usecase.factory";
import FindAllUserUsecaseFactory from "../../../usecase/user/findAll/findAll.user.usecase.factory";
// import Auth from '../../middleware/auth';
// import BuyUserUsecaseFactory from '../../../usecase/user/buy/buy.user.usecase.factory';
import ForgotPasswordUserUsecaseFactory from "../../../usecase/user/forgotPassword/forgotPassword.user.usecase.factory";
import LoginUserUsecaseFactory from "../../../usecase/user/login/update.user.usecase.factory";
import UpdateUserUsecaseFactory from "../../../usecase/user/update/update.user.usecase.factory";

class UserRoute {
	router: Router;

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get("/findAllUser", this.findAllUser);
		this.router.post("/createUser", this.createUser);
		this.router.post("/loginUser", this.loginUser);
		this.router.put("/updateUser/:id", this.updateUser);
		this.router.get("/findUser/:id", this.findUser);
		this.router.post("/forgotPassword", this.forgotPassword);
	}

	async findAllUser(req: Request, res: Response) {
		const useCase = FindAllUserUsecaseFactory.create();
		try {
			const output = await useCase.execute();
			res.send(output);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).send({ error: error.message });
			}
		}
	}

	async createUser(req: Request, res: Response) {
		const useCase = CreateUserUsecaseFactory.create();
		const { name, password, email, serverId, gameUserId, nickname } = req.body;
		const userDto = {
			name,
			password,
			email,
			serverId,
			gameUserId,
			nickname,
		};
		try {
			const output = await useCase.execute(userDto);
			res.send(output);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).send({ error: error.message });
			}
		}
	}

	async loginUser(req: Request, res: Response) {
		const userUseCase = LoginUserUsecaseFactory.create();
		const { password, email } = req.body;
		const userDto = {
			password,
			email,
		};
		try {
			const output = await userUseCase.execute(userDto);
			res.send(output);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).send({ error: error.message });
			}
		}
	}

	async updateUser(req: Request, res: Response) {
		const useCase = UpdateUserUsecaseFactory.create();
		const { name, password, email, gameUserId } = req.body;
		const { id } = req.params;
		const userDto = {
			id,
			name,
			gameUserId,
			password,
			email,
		};
		try {
			const output = await useCase.execute(userDto);
			res.send(output);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).send({ error: error.message });
			}
		}
	}

	async findUser(req: Request, res: Response) {
		const useCase = FindUserUsecaseFactory.create();
		const { id } = req.params;
		const userDto = { id };
		try {
			const output = await useCase.execute(userDto);
			res.send(output);
		} catch (error) {
			if (error instanceof Error) {
				res.status(404).send({ error: error.message });
			}
		}
	}

	async forgotPassword(req: Request, res: Response) {
		const useCase = ForgotPasswordUserUsecaseFactory.create();
		const { email } = req.body;
		const userDto = { email };
		try {
			const output = await useCase.execute(userDto);
			res.send(output);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).send({ error: error.message });
			}
		}
	}

	// buyProduct() {
	//   this.router.post(
	//     '/buyProduct/:userId',
	//     Auth.verifyToken,
	//     async (req: Request, res: Response) => {
	//       const useCase = BuyUserUsecaseFactory.create();

	//       const { userId } = req.params;
	//       const {
	//         productId,
	//         installments,
	//         token,
	//         functions,
	//         gameUserId,
	//         gameItemName,
	//         cardInfos: { cardNumber, holderName, expMonth, expYear, cvv },
	//       } = req.body;

	//       const userDto = {
	//         userId,
	//         productId,
	//         installments,
	//         token,
	//         functions,
	//         gameUserId,
	//         gameItemName,
	//         cardInfos: {
	//           cardNumber: cardNumber,
	//           holderName: holderName,
	//           expMonth: expMonth,
	//           expYear: expYear,
	//           cvv: cvv,
	//         },
	//       };

	//       try {
	//         const output = await useCase.execute(userDto);
	//         res.send(output);
	//       } catch (error) {
	//         if (error instanceof Error) {
	//           res.status(500).send({ error: error.message });
	//         }
	//       }
	//     },
	//   );
	// }
}

export default new UserRoute().router;
