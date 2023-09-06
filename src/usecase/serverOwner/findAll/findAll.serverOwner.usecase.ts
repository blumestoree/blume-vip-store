import ServerOwnerRepositoryInterface from '../../../domain/serverOwner/repositories/serverOwner.repository.interface';
import { OutputFindAllServerOwnerDto } from './findAll.serverOwner.dto';

export default class FindAllServerOwnerUseCase {
  private ServerOwnerRepository: ServerOwnerRepositoryInterface;

  constructor(ServerOwnerRepository: ServerOwnerRepositoryInterface) {
    this.ServerOwnerRepository = ServerOwnerRepository;
  }

  async execute(): Promise<OutputFindAllServerOwnerDto> {
    const allServerOwners = await this.ServerOwnerRepository.findAll();
    return {
      serverOwners: allServerOwners.map((serverOwner) => {
        return {
          serverOwnerId: serverOwner.serverOwnerId,
          name: serverOwner.name,
          email: serverOwner.email,
          serverId: serverOwner.serverId,
        };
      }),
    };
  }
}
