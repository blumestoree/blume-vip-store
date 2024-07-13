import ProductFactory from '../../../domain/product/factory/product.factory';
import ProductRepositoryInterface from '../../../domain/product/repositories/product.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputCreateProductDto, OutputCreateProductDto } from './create.product.dto';
import UploadImageInterface from '../../../infrastructure/product/uploadImage/product.uploadImage.interface';
import CategoryFacadeInterface from '../../../domain/category/facade/category.facade.interface';
import CategoryFactory from '../../../domain/category/factory/category.factory';

export default class CreateProductUseCase
  implements UseCaseInterface<InputCreateProductDto, OutputCreateProductDto>
{
  constructor(
    private productRepository: ProductRepositoryInterface,
    private categoryFacade: CategoryFacadeInterface,
    private uploadImage: UploadImageInterface,
  ) {}

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const findCategory = await this.categoryFacade.findCategoryById({ id: input.categoryId });
    const category = CategoryFactory.create(findCategory.name, findCategory.functionInGame, findCategory.serverId);

    const product = ProductFactory.create(
      input.name,
      input.gameItemName,
      input.image,
      input.price,
      input.serverId,
      category,
    );

    await this.productRepository.create(product);
    await this.uploadImage.sendImage(input.image);

    return {
      id: product.id,
      name: product.name,
      gameItemName: product.gameItemName,
      image: product.image,
      price: product.price,
      serverId: product.serverId,
      category: {
            id: category.id,
            name: category.name,
            functionInGame: category.functionInGame,
          }
    };
  }
}
