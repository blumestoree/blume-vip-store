import { NextFunction, Request, Response } from 'express';
import UserAuthTokenUsecase from '../../usecase/authToken/token/create.token.usecase';
import AuthTokenRepository from '../../infrastructure/authToken/repositories/authToken.repository';

export default class Auth {
  static verifyToken(req: Request, res: Response, next: NextFunction) {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
      res.status(401).send('Not authorized');
    }

    const token = (tokenHeader && tokenHeader.split(' ')[1]) || '';

    try {
      new UserAuthTokenUsecase(new AuthTokenRepository()).verifyToken(token);
      next();
    } catch (error) {
      res.status(500).send('Token not valid');
    }
  }
}
