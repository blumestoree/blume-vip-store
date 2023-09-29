import ServerRepositoryInterface from '../../../domain/server/repositories/server.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputUpdateServerDto, OutputCreateServerDto } from './update.server.dto';

export default class UpdateServerUseCase
  implements UseCaseInterface<InputUpdateServerDto, OutputCreateServerDto>
{
  private serverRepository: ServerRepositoryInterface;

  constructor(ServerRepository: ServerRepositoryInterface) {
    this.serverRepository = ServerRepository;
  }

  async execute(input: InputUpdateServerDto): Promise<OutputCreateServerDto> {
    const server = await this.serverRepository.find(input.serverId);
    server.changeName(input.name);

    await this.serverRepository.update(server);

    return {
      serverId: server.serverId,
      name: server.name,
      serverOwnerId: server.serverOwnerId,
    };
  }
}
