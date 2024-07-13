import UseCaseInterface from '../../../shared/usecase.interface';
import CategoryFacadeInterface, {
  InputFindCategoryFacadeDto,
  OutputFindCategoryFacadeDto,
} from './category.facade.interface';

export default class CategoryFacade implements CategoryFacadeInterface {
  constructor(
    private categoryUseCase: UseCaseInterface<
      InputFindCategoryFacadeDto,
      OutputFindCategoryFacadeDto
    >,
  ) {}

  findCategoryById(input: InputFindCategoryFacadeDto) {
    return this.categoryUseCase.execute(input);
  }
}
