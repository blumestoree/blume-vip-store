import ServerFactory from '../../../domain/server/factory/server.factory';
import ServerRepositoryInterface from '../../../domain/server/repositories/server.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputCreateServerDto, OutputCreateServerDto } from './create.server.dto';

export default class CreateServerUseCase
  implements UseCaseInterface<InputCreateServerDto, OutputCreateServerDto>
{
  constructor(private serverRepository: ServerRepositoryInterface) {}

  async execute(input: InputCreateServerDto): Promise<OutputCreateServerDto> {
    const server = ServerFactory.create(input.name, input.image, input.banner, input.serverOwnerId);
    await this.serverRepository.create(server);

    return {
      id: server.id,
      name: server.name,
      image: server.image,
      banner: server.banner,
      serverOwnerId: server.serverOwnerId,
    };
  }
}
