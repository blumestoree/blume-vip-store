import UserRepository from '../../../infrastructure/user/repositories/user.repository';
import FindAllUserUseCase from './findAll.user.usecase';

export default class FindAllUserUsecaseFactory {
  static create() {
    return new FindAllUserUseCase(new UserRepository());
  }
}
