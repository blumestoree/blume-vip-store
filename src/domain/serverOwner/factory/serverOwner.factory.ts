import ServerOwner from '../entity/serverOwner.entity';
import { v4 as uuid } from 'uuid';

export default class ServerOwnerFactory {
  static create(
    name: string,
    email: string,
    password: string,
    id?: string,
    servers?: string[],
  ): ServerOwner {
    return new ServerOwner(id || uuid(), name, email, password, servers || []);
  }
}
