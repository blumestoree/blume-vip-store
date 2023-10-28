import ServerRepository from '../../../infrastructure/server/repositories/server.repository';
import CreateServerUseCase from './create.server.usecase';

export default class CreateServerUsecaseFactory {
  static create() {
    return new CreateServerUseCase(new ServerRepository());
  }
}
