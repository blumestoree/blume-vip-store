import ServerRepositoryInterface from '../../../domain/server/repositories/server.repository.interface';
import { InputUpdateServerDto, InputCreateServerDto } from './update.server.dto';

export default class UpdateServerUseCase {
  private serverRepository: ServerRepositoryInterface;

  constructor(ServerRepository: ServerRepositoryInterface) {
    this.serverRepository = ServerRepository;
  }

  async execute(input: InputUpdateServerDto): Promise<InputCreateServerDto> {
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
