import ServerRepositoryInterface from '../../../domain/server/repositories/server.repository.interface';
import { OutputFindAllServerDto } from './findAll.server.dto';

export default class FindAllServerUseCase {
  private ServerRepository: ServerRepositoryInterface;

  constructor(ServerRepository: ServerRepositoryInterface) {
    this.ServerRepository = ServerRepository;
  }

  async execute(): Promise<OutputFindAllServerDto> {
    const allServers = await this.ServerRepository.findAll();
    return {
      servers: allServers.map((server) => {
        return {
          serverId: server.serverId,
          name: server.name,
          serverOwnerId: server.serverOwnerId,
        };
      }),
    };
  }
}
