import UseCaseInterface from '../../../shared/usecase.interface';
import ProductFacadeInterface, {
  InputFindProductsFacadeDto,
  OutputFindProductsFacadeDto,
} from './product.facade.interface';

export default class ProductFacade implements ProductFacadeInterface {
  constructor(
    private productUseCase: UseCaseInterface<
      InputFindProductsFacadeDto,
      OutputFindProductsFacadeDto[]
    >,
  ) {}

  findProductsByIds(input: InputFindProductsFacadeDto) {
    return this.productUseCase.execute(input);
  }
}
