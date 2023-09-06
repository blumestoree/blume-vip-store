import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import serverOwnerRoute from './app/routes/serverOwner.route';

interface IServer {
  app: express.Application;
  port: number | string;
}

class Server implements IServer {
  app: express.Application;
  port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.SERVER_PORT || 4000;
    this.middlewares();
    this.routes();
    this.startServer();
  }

  startServer() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }

  routes() {
    this.app.use(serverOwnerRoute);
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(express.json());
  }
}

new Server();
