import { Request, Response, Router } from 'express';
import RefreshTokenRouteInterface from './refreshToken.route.interface';
import AuthTokenUsecaseFactory from '../../../usecase/authToken/factory/authToken.usecase.factory';

class RefreshTokenRoute implements RefreshTokenRouteInterface {
  router: Router;

  constructor() {
    this.router = Router();
    this.refreshToken();
  }

  refreshToken() {
    this.router.post('/refreshToken', async (req: Request, res: Response) => {
      const { refreshToken } = req.body;
      try {
        const token = await AuthTokenUsecaseFactory.create().verifyRefreshToken(refreshToken);
        res.send({ token });
      } catch (error) {
        if (error instanceof Error) {
          res.status(401).send({ error: error.message });
        }
      }
    });
  }
}

export default new RefreshTokenRoute().router;
