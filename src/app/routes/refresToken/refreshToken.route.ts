import { Request, Response, Router } from 'express';
import AuthTokenUsecaseFactory from '../../../usecase/authToken/factory/authToken.usecase.factory';

class RefreshTokenRoute {
  router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/refreshToken', this.refreshToken);
  }

  async refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body;
    try {
      const token = await AuthTokenUsecaseFactory.create().verifyRefreshToken(refreshToken);
      res.send({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).send({ error: error.message });
      }
    }
  }
}

export default new RefreshTokenRoute().router;
