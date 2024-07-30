import userOnServer from '../entity/userOnServer.entity';
import { v4 as uuid } from 'uuid';

export default class UserOnServerFactory {
  static create(
    users: string[],
    servers: string[],
    gameUserId: string,
    nickname: string,
    id?: string
  ): userOnServer {
    return new userOnServer(id || uuid(), users, servers, gameUserId, nickname);
  }
}
