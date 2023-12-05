import { Request, Response, Router } from 'express';
import ServerRouteInterface from './server.route.interface';
import FindAllServerUsecaseFactory from '../../../usecase/server/findAll/findAll.server.usecase.factory';
import CreateServerUsecaseFactory from '../../../usecase/server/create/create.server.usecase.factory';
import UpdateServerUsecaseFactory from '../../../usecase/server/update/update.server.usecase.factory';
import FindServerUsecaseFactory from '../../../usecase/server/find/find.server.usecase.factory';

class ServerRoute implements ServerRouteInterface {
  router: Router;

  constructor() {
    this.router = Router();
    this.findAllServer();
    this.createServer();
    this.updateServer();
    this.findServer();
  }

  findAllServer() {
    this.router.get('/findAllServer', async (req: Request, res: Response) => {
      const useCase = FindAllServerUsecaseFactory.create();
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

  createServer() {
    this.router.post('/createServer', async (req: Request, res: Response) => {
      const useCase = CreateServerUsecaseFactory.create();
      const { name, serverOwnerId } = req.body;
      const serverDto = {
        name,
        serverOwnerId,
      };
      try {
        const output = await useCase.execute(serverDto);
        res.send(output);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).send({ error: error.message });
        }
      }
    });
  }

  updateServer() {
    this.router.put('/updateServer/:id', async (req: Request, res: Response) => {
      const useCase = UpdateServerUsecaseFactory.create();
      const { name, serverOwnerId } = req.body;
      const { id } = req.params;
      const serverDto = {
        id,
        name,
        serverOwnerId,
      };
      try {
        const output = await useCase.execute(serverDto);
        res.send(output);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).send({ error: error.message });
        }
      }
    });
  }

  findServer() {
    this.router.get('/findServer/:id', async (req: Request, res: Response) => {
      const useCase = FindServerUsecaseFactory.create();
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
    });
  }
}

export default new ServerRoute().router;
