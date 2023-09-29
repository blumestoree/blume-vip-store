import ServerOwnerRepositoryInterface from '../../../domain/serverOwner/repositories/serverOwner.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { OutputFindAllServerOwnerDto } from './findAll.serverOwner.dto';

export default class FindAllServerOwnerUseCase
  implements UseCaseInterface<undefined, OutputFindAllServerOwnerDto>
{
  constructor(private serverOwnerRepository: ServerOwnerRepositoryInterface) {}

  async execute(): Promise<OutputFindAllServerOwnerDto> {
    const allServerOwners = await this.serverOwnerRepository.findAll();
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
