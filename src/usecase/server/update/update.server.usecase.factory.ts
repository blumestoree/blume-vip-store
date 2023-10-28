import ServerRepository from '../../../infrastructure/server/repositories/server.repository';
import UpdateServerUseCase from './update.server.usecase';

export default class UpdateServerUsecaseFactory {
  static create() {
    return new UpdateServerUseCase(new ServerRepository());
  }
}
