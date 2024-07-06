import ServerRepositoryInterface from '../../../domain/server/repositories/server.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputUpdateServerDto, OutputCreateServerDto } from './update.server.dto';

export default class UpdateServerUseCase
  implements UseCaseInterface<InputUpdateServerDto, OutputCreateServerDto>
{
  constructor(private serverRepository: ServerRepositoryInterface) {}

  async execute(input: InputUpdateServerDto): Promise<OutputCreateServerDto> {
    const server = await this.serverRepository.find(input.id);
    server.changeName(input.name);

    await this.serverRepository.update(server);

    return {
      id: server.id,
      name: server.name,
      image: server.image,
      banner: server.banner,
      serverOwnerId: server.serverOwnerId,
      products: server.products,
      categories: server.categories,
    };
  }
}
