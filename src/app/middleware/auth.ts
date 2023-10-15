import { NextFunction, Request, Response } from 'express';
import AuthTokenFactory from '../../usecase/authToken/factory/authtoken.factory';

export default class Auth {
  static verifyToken(req: Request, res: Response, next: NextFunction) {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
      res.status(401).send('Not authorized');
    }

    const token = (tokenHeader && tokenHeader.split(' ')[1]) || '';

    try {
      AuthTokenFactory.create().verifyToken(token);
      next();
    } catch (error) {
      res.status(500).send('Token not valid');
    }
  }
}
