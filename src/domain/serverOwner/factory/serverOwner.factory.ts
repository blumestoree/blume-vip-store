import ServerOwner from '../entity/serverOwner.entity';
import { v4 as uuid } from 'uuid';

export default class ServerOwnerFacture {
  static create(
    name: string,
    email: string,
    password: string,
    id?: string,
    serverId?: number,
  ): ServerOwner {
    return new ServerOwner(id || uuid(), name, email, password, serverId);
  }
}
