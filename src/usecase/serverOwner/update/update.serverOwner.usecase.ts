import ServerOwnerRepositoryInterface from '../../../domain/serverOwner/repositories/serverOwner.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputUpdateServerOwnerDto, OutputCreateServerOwnerDto } from './update.serverOwner.dto';

export default class UpdateServerOwnerUseCase
  implements UseCaseInterface<InputUpdateServerOwnerDto, OutputCreateServerOwnerDto>
{
  constructor(private serverOwnerRepository: ServerOwnerRepositoryInterface) {}

  async execute(input: InputUpdateServerOwnerDto): Promise<OutputCreateServerOwnerDto> {
    const serverOwner = await this.serverOwnerRepository.find(input.id);
    serverOwner.changeName(input.name);

    await this.serverOwnerRepository.update(serverOwner);

    return {
      id: serverOwner.id,
      name: serverOwner.name,
      email: serverOwner.email,
      server: serverOwner.servers,
    };
  }
}
