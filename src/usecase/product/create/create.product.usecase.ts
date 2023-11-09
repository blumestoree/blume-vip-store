import ProductFactory from '../../../domain/product/factory/product.factory';
import ProductRepositoryInterface from '../../../domain/product/repositories/product.repository.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputCreateProductDto, OutputCreateProductDto } from './create.product.dto';
import UploadImageInterface from '../../../infrastructure/product/uploadImage/product.uploadImage.interface';

export default class CreateProductUseCase
  implements UseCaseInterface<InputCreateProductDto, OutputCreateProductDto>
{
  constructor(
    private productRepository: ProductRepositoryInterface,
    private uploadImage: UploadImageInterface,
  ) {}

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create(
      input.name,
      input.categoryId,
      input.image,
      input.price,
      input.serverId,
    );

    await this.productRepository.create(product);
    const productData = await this.productRepository.find(product.id);
    await this.uploadImage.sendImage(input.image);

    return {
      id: product.id,
      name: product.name,
      categoryId: product.categoryId,
      image: product.image,
      price: product.price,
      serverId: product.serverId,
      category: productData.category
        ? {
            id: productData.category.id,
            name: productData.category.name,
          }
        : null,
    };
  }
}
