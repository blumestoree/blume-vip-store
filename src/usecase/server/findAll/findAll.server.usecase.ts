import ServerRepositoryInterface from '../../../domain/server/repositories/server.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { OutputFindAllServerDto } from './findAll.server.dto';

export default class FindAllServerUseCase
  implements UseCaseInterface<undefined, OutputFindAllServerDto[]>
{
  constructor(private serverRepository: ServerRepositoryInterface) {}

  async execute(): Promise<OutputFindAllServerDto[]> {
    const allServers = await this.serverRepository.findAll();
    return allServers.map((server) => {
      return {
        id: server.id,
        name: server.name,
        image: server.image,
        banner: server.banner,
        serverOwnerId: server.serverOwnerId,
        product: server.product,
        category: server.category,
      };
    });
  }
}
