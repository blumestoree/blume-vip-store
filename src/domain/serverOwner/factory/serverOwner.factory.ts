import ServerOwner from '../entity/serverOwner.entity';
import { v4 as uuid } from 'uuid';

export default class ServerOwnerFacture {
  static create(name: string, email: string, password: string): ServerOwner {
    return new ServerOwner(uuid(), name, email, password);
  }

  static createWithServer(
    name: string,
    email: string,
    password: string,
    serverId: number,
  ): ServerOwner {
    const serverOwner = new ServerOwner(uuid(), name, email, password);
    serverOwner.changeServer(serverId);
    return serverOwner;
  }
}
