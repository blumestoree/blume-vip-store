import { Request, Response, Router } from 'express';
// import Auth from '../../middleware/auth';
import UserRouteInterface from './user.route.interface';
// import BuyUserUsecaseFactory from '../../../usecase/user/buy/buy.user.usecase.factory';
import ForgotPasswordUserUsecaseFactory from '../../../usecase/user/forgotPassword/forgotPassword.user.usecase.factory';
import FindUserUsecaseFactory from '../../../usecase/user/find/find.user.usecase.factory';
import UpdateUserUsecaseFactory from '../../../usecase/user/update/update.user.usecase.factory';
import LoginUserUsecaseFactory from '../../../usecase/user/login/update.user.usecase.factory';
import CreateUserUsecaseFactory from '../../../usecase/user/create/create.user.usecase.factory';
import FindAllUserUsecaseFactory from '../../../usecase/user/findAll/findAll.user.usecase.factory';

class UserRoute implements UserRouteInterface {
  router: Router;

  constructor() {
    this.router = Router();
    this.findAllUser();
    this.createUser();
    this.loginUser();
    this.updateUser();
    this.findUser();
    this.forgotPassword();
    // this.buyProduct();
  }

  findAllUser() {
    this.router.get('/findAllUser', async (req: Request, res: Response) => {
      const useCase = FindAllUserUsecaseFactory.create();
      try {
        const output = await useCase.execute();
        res.send(output);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).send({ error: error.message });
        }
      }
    });
  }

  createUser() {
    this.router.post('/createUser', async (req: Request, res: Response) => {
      const useCase = CreateUserUsecaseFactory.create();
      const { name, password, email, gameUserId } = req.body;
      const userDto = {
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
    });
  }

  loginUser() {
    this.router.post('/loginUser', async (req: Request, res: Response) => {
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
    });
  }

  updateUser() {
    this.router.put('/updateUser/:id', async (req: Request, res: Response) => {
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
    });
  }

  findUser() {
    this.router.get('/findUser/:id', async (req: Request, res: Response) => {
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
    });
  }

  forgotPassword() {
    this.router.post('/forgotPassword', async (req: Request, res: Response) => {
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
    });
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
