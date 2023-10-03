import ServerRepositoryInterface from '../../../domain/server/repositories/server.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { OutputFindAllServerDto } from './findAll.server.dto';

export default class FindAllServerUseCase
  implements UseCaseInterface<undefined, OutputFindAllServerDto>
{
  constructor(private serverRepository: ServerRepositoryInterface) {}

  async execute(): Promise<OutputFindAllServerDto> {
    const allServers = await this.serverRepository.findAll();
    return {
      servers: allServers.map((server) => {
        return {
          id: server.id,
          name: server.name,
          serverOwnerId: server.serverOwnerId,
        };
      }),
    };
  }
}
