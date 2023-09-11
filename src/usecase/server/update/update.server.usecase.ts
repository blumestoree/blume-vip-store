import ServerRepositoryInterface from '../../../domain/server/repositories/server.repository.interface';
import { InputUpdateServerDto, InputCreateServerDto } from './update.server.dto';

export default class UpdateServerUseCase {
  private ServerRepository: ServerRepositoryInterface;

  constructor(ServerRepository: ServerRepositoryInterface) {
    this.ServerRepository = ServerRepository;
  }

  async execute(input: InputUpdateServerDto): Promise<InputCreateServerDto> {
    const server = await this.ServerRepository.find(input.serverId);
    server.changeName(input.name);

    await this.ServerRepository.update(server);

    return {
      serverId: server.serverId,
      name: server.name,
    };
  }
}
