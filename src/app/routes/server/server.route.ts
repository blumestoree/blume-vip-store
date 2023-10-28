import { Request, Response, Router } from 'express';
import ServerRouteInterface from './server.route.interface';
import FindAllServertUsecaseFactory from '../../../usecase/server/findAll/findAll.server.usecase.factory';
import CreateServertUsecaseFactory from '../../../usecase/server/create/create.server.usecase.factory';
import UpdateServertUsecaseFactory from '../../../usecase/server/update/update.server.usecase.factory';
import FindServertUsecaseFactory from '../../../usecase/server/find/find.server.usecase.factory';

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
      const useCase = FindAllServertUsecaseFactory.create();
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
      const useCase = CreateServertUsecaseFactory.create();
      const { name, serverOwnerId } = req.body;
      try {
        const serverDto = {
          name,
          serverOwnerId,
        };
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
      const useCase = UpdateServertUsecaseFactory.create();
      const { name, serverOwnerId } = req.body;
      const { id } = req.params;
      try {
        const serverDto = {
          id,
          name,
          serverOwnerId,
        };
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
      const useCase = FindServertUsecaseFactory.create();
      const { id } = req.params;
      try {
        const serverDto = { id };
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
