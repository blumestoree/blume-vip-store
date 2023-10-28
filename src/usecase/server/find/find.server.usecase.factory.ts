import ServerRepository from '../../../infrastructure/server/repositories/server.repository';
import FindServerUseCase from './find.server.usecase';

export default class FindServerUsecaseFactory {
  static create() {
    return new FindServerUseCase(new ServerRepository());
  }
}
