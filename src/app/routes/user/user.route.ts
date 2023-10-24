import { Request, Response, Router } from 'express';
import FindAllUserUseCase from '../../../usecase/user/findAll/findAll.user.usecase';
import UserRepository from '../../../infrastructure/user/repositories/user.repository';
import CreateUserUseCase from '../../../usecase/user/create/create.user.usecase';
import FindUserUseCase from '../../../usecase/user/find/find.user.usecase';
import UpdateUserUseCase from '../../../usecase/user/update/update.user.usecase';
import UserBuyProductUseCase from '../../../usecase/user/buy/buy.user.usecase';
import PaymentFacade from '../../../domain/payment/facade/payment.facade';
import ProductFacade from '../../../domain/product/facade/product.facade';
import productRepository from '../../../infrastructure/product/repositories/product.repository';
import FindProductUseCase from '../../../usecase/product/find/find.product.usecase';
import PaymentRepository from '../../../infrastructure/payment/repositories/payment.repository';
import PaymentProcessUseCase from '../../../usecase/payment/create/create.payment.usecase';
import ProcessPayment from '../../../usecase/user/buy/processPayment/processPayment.service';
import LoginUserUseCase from '../../../usecase/user/login/login.user.usecase';
import Auth from '../../middleware/auth';
import ForgotPasswordUseCase from '../../../usecase/user/forgotPassword/forgotPassword.user.usecase';
import SendEmail from '../../../usecase/user/forgotPassword/transportEmail/sendEmail';
import UserRouteInterface from './user.route.interface';

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
    this.buyProduct();
  }

  findAllUser() {
    this.router.get('/findAllUser', async (req: Request, res: Response) => {
      const useCase = new FindAllUserUseCase(new UserRepository());
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
        if (error instanceof Error) {
          res.status(500).send({ error: error.message });
        }
      }
    });
  }

  loginUser() {
    this.router.post('/loginUser', async (req: Request, res: Response) => {
      const userUseCase = new LoginUserUseCase(new UserRepository());

      const { password, email } = req.body;
      try {
        const userDto = {
          password,
          email,
        };

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
        if (error instanceof Error) {
          res.status(500).send({ error: error.message });
        }
      }
    });
  }

  findUser() {
    this.router.get('/findUser/:id', async (req: Request, res: Response) => {
      const useCase = new FindUserUseCase(new UserRepository());
      const { id } = req.params;
      try {
        const userDto = { id };
        const output = await useCase.execute(userDto);
        res.send(output);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).send({ error: error.message });
        }
      }
    });
  }

  forgotPassword() {
    this.router.post('/forgotPassword', async (req: Request, res: Response) => {
      const useCase = new ForgotPasswordUseCase(new UserRepository(), new SendEmail());
      const { email } = req.body;
      try {
        const userDto = { email };
        const output = await useCase.execute(userDto);
        res.send(output);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).send({ error: error.message });
        }
      }
    });
  }

  buyProduct() {
    this.router.post(
      '/buyProduct/:productId',
      Auth.verifyToken,
      async (req: Request, res: Response) => {
        const userRepository = new UserRepository();
        const productUseCase = new FindProductUseCase(new productRepository());

        const paymentUseCase = new PaymentProcessUseCase(new PaymentRepository());

        const facadePayment = new PaymentFacade(paymentUseCase);
        const facadeProduct = new ProductFacade(productUseCase);

        const processPayment = new ProcessPayment();

        const useCase = new UserBuyProductUseCase(
          facadePayment,
          facadeProduct,
          userRepository,
          processPayment,
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
          if (error instanceof Error) {
            res.status(500).send({ error: error.message });
          }
        }
      },
    );
  }
}

export default new UserRoute().router;
