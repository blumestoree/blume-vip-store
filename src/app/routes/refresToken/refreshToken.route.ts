import { Request, Response, Router } from 'express';
import AuthTokenFactory from '../../../usecase/authToken/factory/authtoken.factory';
import RefreshTokenRouteInterface from './refreshToken.route.interface';

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
        const token = await AuthTokenFactory.create().verifyRefreshToken(refreshToken);
        res.send({ token });
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).send({ error: error.message });
        }
      }
    });
  }
}

export default new RefreshTokenRoute().router;
