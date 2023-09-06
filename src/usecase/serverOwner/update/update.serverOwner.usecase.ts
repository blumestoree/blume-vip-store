import ServerOwnerRepositoryInterface from '../../../domain/serverOwner/repositories/serverOwner.repository.interface';
import { InputUpdateServerOwnerDto, InputCreateServerOwnerDto } from './update.serverOwner.dto';

export default class UpdateServerOwnerUseCase {
  private ServerOwnerRepository: ServerOwnerRepositoryInterface;

  constructor(ServerOwnerRepository: ServerOwnerRepositoryInterface) {
    this.ServerOwnerRepository = ServerOwnerRepository;
  }

  async execute(input: InputUpdateServerOwnerDto): Promise<InputCreateServerOwnerDto> {
    const serverOwner = await this.ServerOwnerRepository.find(input.serverOwnerId);
    serverOwner.changeName(input.name);

    await this.ServerOwnerRepository.update(serverOwner);

    return {
      serverOwnerId: serverOwner.serverOwnerId,
      name: serverOwner.name,
      email: serverOwner.email,
      serverId: serverOwner.serverId,
    };
  }
}
