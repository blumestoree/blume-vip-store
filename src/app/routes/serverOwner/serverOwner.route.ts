import { Request, Response, Router } from 'express';
import FindAllServerOwnerUseCase from '../../../usecase/serverOwner/findAll/findAll.serverOwner.usecase';
import ServerOwnerRepository from '../../../infrastructure/serverOwner/repositories/serverOwner.repository';
import CreateServerOwnerUseCase from '../../../usecase/serverOwner/create/create.serverOwner.usecase';
import FindServerOwnerUseCase from '../../../usecase/serverOwner/find/find.serverOwner.usecase';
import UpdateServerOwnerUseCase from '../../../usecase/serverOwner/update/update.serverOwner.usecase';
import ServerOwnerRouteInterface from './serverOwner.route.interface';

class ServerOwnerRoute implements ServerOwnerRouteInterface {
  router: Router;

  constructor() {
    this.router = Router();
    this.findAllServerOwner();
    this.createServerOwner();
    this.updateServerOwner();
    this.findServerOwner();
  }

  findAllServerOwner() {
    this.router.get('/findAllServerOwner', async (req: Request, res: Response) => {
      const useCase = new FindAllServerOwnerUseCase(new ServerOwnerRepository());
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

  createServerOwner() {
    this.router.post('/createServerOwner', async (req: Request, res: Response) => {
      const useCase = new CreateServerOwnerUseCase(new ServerOwnerRepository());
      const { name, email, password } = req.body;
      try {
        const serverOwnerDto = {
          name,
          email,
          password,
        };
        const output = await useCase.execute(serverOwnerDto);
        res.send(output);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).send({ error: error.message });
        }
      }
    });
  }

  updateServerOwner() {
    this.router.put('/updateServerOwner/:id', async (req: Request, res: Response) => {
      const useCase = new UpdateServerOwnerUseCase(new ServerOwnerRepository());
      const { name, email, password, serverId } = req.body;
      const { id } = req.params;
      try {
        const serverOwnerDto = {
          id,
          name,
          email,
          password,
          serverId,
        };
        const output = await useCase.execute(serverOwnerDto);
        res.send(output);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).send({ error: error.message });
        }
      }
    });
  }

  findServerOwner() {
    this.router.get('/findServerOwner/:id', async (req: Request, res: Response) => {
      const useCase = new FindServerOwnerUseCase(new ServerOwnerRepository());
      const { id } = req.params;
      try {
        const serverOwnerDto = { id };
        const output = await useCase.execute(serverOwnerDto);
        res.send(output);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).send({ error: error.message });
        }
      }
    });
  }
}

export default new ServerOwnerRoute().router;
