import userOnServer from '../entity/userOnServer.entity';
import { v4 as uuid } from 'uuid';

export default class UserOnServerFactory {
  static create(
    user: string,
    server: string,
    gameUserId: string,
    nickname: string,
    id?: string
  ): userOnServer {
    return new userOnServer(id || uuid(), user, server, gameUserId, nickname);
  }
}
