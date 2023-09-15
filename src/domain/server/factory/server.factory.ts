import Server from '../entity/server.entity';
import { v4 as uuid } from 'uuid';

export default class ServerFacture {
  static create(name: string): Server {
    return new Server(uuid(), name);
  }
}
