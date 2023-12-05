import { Request, Response, Router } from 'express';
import ServerOwnerRouteInterface from './serverOwner.route.interface';
import CreateServerOwnerUsecaseFactory from '../../../usecase/serverOwner/create/create.serverOwner.usecase.factory';
import FindAllServerOwnerUsecaseFactory from '../../../usecase/serverOwner/findAll/findAll.serverOwner.usecase.factory';
import UpdateServerOwnerUsecaseFactory from '../../../usecase/serverOwner/update/update.serverOwner.usecase.factory';
import FindServerOwnerUsecaseFactory from '../../../usecase/serverOwner/find/find.serverOwner.usecase.factory';

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
      const useCase = FindAllServerOwnerUsecaseFactory.create();
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
      const useCase = CreateServerOwnerUsecaseFactory.create();
      const { name, email, password } = req.body;
      const serverOwnerDto = {
        name,
        email,
        password,
      };
      try {
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
      const useCase = UpdateServerOwnerUsecaseFactory.create();
      const { name, email, password, serverId } = req.body;
      const { id } = req.params;
      const serverOwnerDto = {
        id,
        name,
        email,
        password,
        serverId,
      };
      try {
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
      const useCase = FindServerOwnerUsecaseFactory.create();
      const { id } = req.params;
      const serverOwnerDto = { id };
      try {
        const output = await useCase.execute(serverOwnerDto);
        res.send(output);
      } catch (error) {
        if (error instanceof Error) {
          res.status(404).send({ error: error.message });
        }
      }
    });
  }
}

export default new ServerOwnerRoute().router;
