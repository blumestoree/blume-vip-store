import UserRepository from '../../../infrastructure/user/repositories/user.repository';
import UpdateUserUseCase from './update.user.usecase';

export default class UpdateUserUsecaseFactory {
  static create() {
    return new UpdateUserUseCase(new UserRepository());
  }
}
