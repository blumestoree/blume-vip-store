import { Request, Response, Router } from 'express';
import CreateServerOwnerUsecaseFactory from '../../../usecase/serverOwner/create/create.serverOwner.usecase.factory';
import FindAllServerOwnerUsecaseFactory from '../../../usecase/serverOwner/findAll/findAll.serverOwner.usecase.factory';
import UpdateServerOwnerUsecaseFactory from '../../../usecase/serverOwner/update/update.serverOwner.usecase.factory';
import FindServerOwnerUsecaseFactory from '../../../usecase/serverOwner/find/find.serverOwner.usecase.factory';

class ServerOwnerRoute {
  router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/findAllServerOwner', this.findAllServerOwner);
    this.router.post('/createServerOwner', this.createServerOwner);
    this.router.put('/updateServerOwner/:id', this.updateServerOwner);
    this.router.get('/findServerOwner', this.findServerOwner);
  }

  async findAllServerOwner(req: Request, res: Response) {
    const useCase = FindAllServerOwnerUsecaseFactory.create();
    try {
      const output = await useCase.execute();
      res.send(output);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ error: error.message });
      }
    }
  }

  async createServerOwner(req: Request, res: Response) {
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
  }

  async updateServerOwner(req: Request, res: Response) {
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
  }

  async findServerOwner(req: Request, res: Response) {
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
  }
}

export default new ServerOwnerRoute().router;
