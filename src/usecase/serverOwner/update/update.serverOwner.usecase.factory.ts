import ServerOwnerRepository from '../../../infrastructure/serverOwner/repositories/serverOwner.repository';
import UpdateServerOwnerUseCase from './update.serverOwner.usecase';

export default class UpdateServerOwnerUsecaseFactory {
  static create() {
    return new UpdateServerOwnerUseCase(new ServerOwnerRepository());
  }
}
