import ServerFactory from '../../../domain/server/factory/server.factory';
import ServerRepositoryInterface from '../../../domain/server/repositories/server.repository.interface';
import { InputCreateServerDto, OutputCreateServerDto } from './create.server.dto';

export default class CreateServerUseCase {
  private ServerRepository: ServerRepositoryInterface;

  constructor(ServerRepository: ServerRepositoryInterface) {
    this.ServerRepository = ServerRepository;
  }

  async execute(input: InputCreateServerDto): Promise<OutputCreateServerDto> {
    const server = ServerFactory.create(input.name, input.serverOwnerId);
    await this.ServerRepository.create(server);

    return {
      serverId: server.serverId,
      name: server.name,
      serverOwnerId: server.serverOwnerId,
    };
  }
}
