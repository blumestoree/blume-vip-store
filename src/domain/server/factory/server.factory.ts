import Server from '../entity/server.entity';
import { v4 as uuid } from 'uuid';

export default class ServerFactory {
  static create(
    name: string,
    image: string,
    banner: string[],
    serverOwnerId: string,
    id?: string,
  ): Server {
    return new Server(id || uuid(), name, image, banner, serverOwnerId);
  }
}
