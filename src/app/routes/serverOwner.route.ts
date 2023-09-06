import { Request, Response, Router } from 'express';
import FindAllServerOwnerUseCase from '../../usecase/serverOwner/findAll/findAll.serverOwner.usecase';
import ServerOwnerRepository from '../../infrastructure/serverOwner/repositories/serverOwner.repository';
import CreateServerOwnerUseCase from '../../usecase/serverOwner/create/create.serverOwner.usecase';
import FindServerOwnerUseCase from '../../usecase/serverOwner/find/find.serverOwner.usecase';
import UpdateServerOwnerUseCase from '../../usecase/serverOwner/update/update.serverOwner.usecase';

class ServerOwnerRoute {
  router: Router;

  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get('/findAllServerOwner', async (req: Request, res: Response) => {
      const useCase = new FindAllServerOwnerUseCase(new ServerOwnerRepository());
      try {
        const output = await useCase.execute();
        res.send(output);
      } catch (error) {
        res.status(500).send(error);
      }
    });
    this.router.post('/createServerOwner', async (req: Request, res: Response) => {
      const useCase = new CreateServerOwnerUseCase(new ServerOwnerRepository());
      const { name, email, password, serverId } = req.body;
      try {
        const serverOwnerDto = {
          name,
          email,
          password,
          serverId,
        };
        const output = await useCase.execute(serverOwnerDto);
        res.send(output);
      } catch (error) {
        res.status(500).send(error);
      }
    });
    this.router.put('/updateServerOwner/:id', async (req: Request, res: Response) => {
      const useCase = new UpdateServerOwnerUseCase(new ServerOwnerRepository());
      const { name, email, password, serverId } = req.body;
      const { id } = req.params;
      try {
        const serverOwnerDto = {
          serverOwnerId: id,
          name,
          email,
          password,
          serverId,
        };
        const output = await useCase.execute(serverOwnerDto);
        res.send(output);
      } catch (error) {
        res.status(500).send(error);
      }
    });
    this.router.get('/findServerOwner/:id', async (req: Request, res: Response) => {
      const useCase = new FindServerOwnerUseCase(new ServerOwnerRepository());
      const { id } = req.params;
      try {
        const serverOwnerDto = {
          serverOwnerId: id,
        };
        const output = await useCase.execute(serverOwnerDto);
        res.send(output);
      } catch (error) {
        res.status(500).send(error);
      }
    });
  }
}

export default new ServerOwnerRoute().router;
