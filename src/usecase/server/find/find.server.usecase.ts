import ServerRepositoryInterface from '../../../domain/server/repositories/server.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputFindServerDto, OutputFindServerDto } from './find.server.dto';

export default class FindServerUseCase
  implements UseCaseInterface<InputFindServerDto, OutputFindServerDto>
{
  private ServerRepository: ServerRepositoryInterface;

  constructor(ServerRepository: ServerRepositoryInterface) {
    this.ServerRepository = ServerRepository;
  }

  async execute(input: InputFindServerDto): Promise<OutputFindServerDto> {
    const server = await this.ServerRepository.find(input.serverId);
    return {
      serverId: server.serverId,
      name: server.name,
      serverOwnerId: server.serverOwnerId,
    };
  }
}
