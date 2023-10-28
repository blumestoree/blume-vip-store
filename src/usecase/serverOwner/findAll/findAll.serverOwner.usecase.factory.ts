import ServerOwnerRepository from '../../../infrastructure/serverOwner/repositories/serverOwner.repository';
import FindAllServerOwnerUseCase from './findAll.serverOwner.usecase';

export default class FindAllServerOwnerUsecaseFactory {
  static create() {
    return new FindAllServerOwnerUseCase(new ServerOwnerRepository());
  }
}
