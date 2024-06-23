import ServerOwnerRepositoryInterface from '../../../domain/serverOwner/repositories/serverOwner.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputFindServerOwnerDto, OutputFindServerOwnerDto } from './find.serverOwner.dto';

export default class FindServerOwnerUseCase
  implements UseCaseInterface<InputFindServerOwnerDto, OutputFindServerOwnerDto>
{
  constructor(private serverOwnerRepository: ServerOwnerRepositoryInterface) {}

  async execute(input: InputFindServerOwnerDto): Promise<OutputFindServerOwnerDto> {
    const serverOwner = await this.serverOwnerRepository.find(input.id);
    return {
      id: serverOwner.id,
      name: serverOwner.name,
      email: serverOwner.email,
      servers: serverOwner.servers,
    };
  }
}
