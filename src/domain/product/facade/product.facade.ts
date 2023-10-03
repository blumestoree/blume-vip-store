import UseCaseInterface from '../../../shared/usecase.interface';
import ProductFacadeInterface, {
  InputFindProductFacadeDto,
  OutputFindProductFacadeDto,
} from './product.facade.interface';

export default class ProductFacade implements ProductFacadeInterface {
  constructor(
    private productUseCase: UseCaseInterface<InputFindProductFacadeDto, OutputFindProductFacadeDto>,
  ) {}

  findProduct(input: InputFindProductFacadeDto): Promise<OutputFindProductFacadeDto> {
    return this.productUseCase.execute(input);
  }
}
