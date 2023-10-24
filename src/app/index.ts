import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import ServerOwnerRoute from './routes/serverOwner/serverOwner.route';
import ServerRoute from './routes/server/server.route';
import ProductRoute from './routes/product/product.route';
import UserRoute from './routes/user/user.route';
import RefreshTokenRoute from './routes/refresToken/refreshToken.route';

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
    this.app.use(ServerOwnerRoute);
    this.app.use(ServerRoute);
    this.app.use(ProductRoute);
    this.app.use(UserRoute);
    this.app.use(RefreshTokenRoute);
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(express.json());
  }
}

new Server();
