import ServerRepository from '../../../infrastructure/server/repositories/server.repository';
import FindAllServerUseCase from './findAll.server.usecase';

export default class FindAllServertUsecaseFactory {
  static create() {
    return new FindAllServerUseCase(new ServerRepository());
  }
}
