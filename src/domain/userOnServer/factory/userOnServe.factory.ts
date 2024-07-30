import userOnServer from '../entity/userOnServer.entity';
import { v4 as uuid } from 'uuid';

export default class UserOnServerFactory {
  static create(
    userId: string[],
    serverId: string[],
    gameUserId: string,
    nickname: string,
    id?: string
  ): userOnServer {
    return new userOnServer(id || uuid(), userId, serverId, gameUserId, nickname);
  }
}
