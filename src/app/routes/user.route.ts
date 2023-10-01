import { Request, Response, Router } from 'express';
import FindAllUserUseCase from '../../usecase/user/findAll/findAll.user.usecase';
import UserRepository from '../../infrastructure/user/repositories/user.repository';
import CreateUserUseCase from '../../usecase/user/create/create.user.usecase';
import FindUserUseCase from '../../usecase/user/find/find.user.usecase';
import UpdateUserUseCase from '../../usecase/user/update/update.user.usecase';

class UserRoute {
  router: Router;

  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get('/findAllUser', async (req: Request, res: Response) => {
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
          userId: id,
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
        const userDto = {
          userId: id,
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
