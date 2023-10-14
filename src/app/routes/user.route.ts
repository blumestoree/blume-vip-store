import { Request, Response, Router } from 'express';
import FindAllUserUseCase from '../../usecase/user/findAll/findAll.user.usecase';
import UserRepository from '../../infrastructure/user/repositories/user.repository';
import CreateUserUseCase from '../../usecase/user/create/create.user.usecase';
import FindUserUseCase from '../../usecase/user/find/find.user.usecase';
import UpdateUserUseCase from '../../usecase/user/update/update.user.usecase';
import UserBuyProductUseCase from '../../usecase/user/buy/buy.user.usecase';
import PaymentFacade from '../../domain/payment/facade/payment.facade';
import ProductFacade from '../../domain/product/facade/product.facade';
import UserFacade from '../../domain/user/facade/user.facade';
import productRepository from '../../infrastructure/product/repositories/product.repository';
import FindProductUseCase from '../../usecase/product/find/find.product.usecase';
import PaymentRepository from '../../infrastructure/payment/repositories/payment.repository';
import PaymentProcessUseCase from '../../usecase/payment/create/create.payment.usecase';
import UserService from '../../domain/user/service/user.service';
import auth from '../middleware/auth';

class UserRoute {
  router: Router;

  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get('/findAllUser', auth.verifyToken, async (req: Request, res: Response) => {
      const useCase = new FindAllUserUseCase(new UserRepository());
      try {
        const output = await useCase.execute();
        res.send(output);
      } catch (error) {
        res.status(500).send(error);
      }
    });
    this.router.post('/createUser', async (req: Request, res: Response) => {
      const useCase = new CreateUserUseCase(new UserRepository());
      const { name, password, email } = req.body;
      try {
        const userDto = {
          name,
          password,
          email,
        };
        const output = await useCase.execute(userDto);
        res.send(output);
      } catch (error) {
        res.status(500).send(error);
      }
    });
    this.router.put('/updateUser/:id', async (req: Request, res: Response) => {
      const useCase = new UpdateUserUseCase(new UserRepository());
      const { name, password, email } = req.body;
      const { id } = req.params;
      try {
        const userDto = {
          id,
          name,
          password,
          email,
        };
        const output = await useCase.execute(userDto);
        res.send(output);
      } catch (error) {
        res.status(500).send(error);
      }
    });
    this.router.get('/findUser/:id', async (req: Request, res: Response) => {
      const useCase = new FindUserUseCase(new UserRepository());
      const { id } = req.params;
      try {
        const userDto = { id };
        const output = await useCase.execute(userDto);
        res.send(output);
      } catch (error) {
        res.status(500).send(error);
      }
    });
    this.router.post('/buyProduct/:productId', async (req: Request, res: Response) => {
      const userUseCase = new FindUserUseCase(new UserRepository());
      const productUseCase = new FindProductUseCase(new productRepository());

      const paymentUseCase = new PaymentProcessUseCase(new PaymentRepository());

      const facadePayment = new PaymentFacade(paymentUseCase);
      const facadeProduct = new ProductFacade(productUseCase);
      const facadeUser = new UserFacade(userUseCase);

      const userService = new UserService();

      const useCase = new UserBuyProductUseCase(
        facadePayment,
        facadeProduct,
        facadeUser,
        userService,
      );

      const { productId } = req.params;
      const { userId } = req.body;

      try {
        const userDto = {
          userId: userId,
          productId: productId,
        };
        const output = await useCase.execute(userDto);
        res.send(output);
      } catch (error) {
        res.status(500).send(error);
      }
    });
  }
}

export default new UserRoute().router;
