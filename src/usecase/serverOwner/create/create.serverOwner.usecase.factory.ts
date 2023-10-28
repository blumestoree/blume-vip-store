import ServerOwnerRepository from '../../../infrastructure/serverOwner/repositories/serverOwner.repository';
import CreateServerOwnerUseCase from './create.serverOwner.usecase';

export default class CreateServerOwnerUsecaseFactory {
  static create() {
    return new CreateServerOwnerUseCase(new ServerOwnerRepository());
  }
}
