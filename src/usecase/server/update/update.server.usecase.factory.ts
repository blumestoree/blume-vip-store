import ServerRepository from '../../../infrastructure/server/repositories/server.repository';
import UpdateServerUseCase from './update.server.usecase';

export default class UpdateServertUsecaseFactory {
  static create() {
    return new UpdateServerUseCase(new ServerRepository());
  }
}
