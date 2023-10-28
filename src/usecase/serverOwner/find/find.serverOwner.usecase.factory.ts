import ServerOwnerRepository from '../../../infrastructure/serverOwner/repositories/serverOwner.repository';
import FindServerOwnerUseCase from './find.serverOwner.usecase';

export default class FindServerOwnerUsecaseFactory {
  static create() {
    return new FindServerOwnerUseCase(new ServerOwnerRepository());
  }
}
