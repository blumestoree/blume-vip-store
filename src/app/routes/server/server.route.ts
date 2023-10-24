import { Request, Response, Router } from 'express';
import FindAllServerUseCase from '../../../usecase/server/findAll/findAll.server.usecase';
import ServerRepository from '../../../infrastructure/server/repositories/server.repository';
import CreateServerUseCase from '../../../usecase/server/create/create.server.usecase';
import FindServerUseCase from '../../../usecase/server/find/find.server.usecase';
import UpdateServerUseCase from '../../../usecase/server/update/update.server.usecase';
import ServerRouteInterface from './server.route.interface';

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
      const useCase = new FindAllServerUseCase(new ServerRepository());
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
      const useCase = new CreateServerUseCase(new ServerRepository());
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
      const useCase = new UpdateServerUseCase(new ServerRepository());
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
      const useCase = new FindServerUseCase(new ServerRepository());
      const { id } = req.params;
      try {
        const serverDto = { id };
        const output = await useCase.execute(serverDto);
        res.send(output);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).send({ error: error.message });
        }
      }
    });
  }
}

export default new ServerRoute().router;
