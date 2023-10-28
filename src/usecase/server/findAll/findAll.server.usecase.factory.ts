import ServerRepository from '../../../infrastructure/server/repositories/server.repository';
import FindAllServerUseCase from './findAll.server.usecase';

export default class FindAllServerUsecaseFactory {
  static create() {
    return new FindAllServerUseCase(new ServerRepository());
  }
}
