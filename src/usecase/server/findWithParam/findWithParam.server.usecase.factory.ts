import ServerRepository from '../../../infrastructure/server/repositories/server.repository';
import FindWithParamServerUseCase from './findWithParam.server.usecase';

export default class findWithParamServerUsecaseFactory {
  static create() {
    return new FindWithParamServerUseCase(new ServerRepository());
  }
}
