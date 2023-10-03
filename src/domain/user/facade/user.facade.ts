import UseCaseInterface from '../../../shared/usecase.interface';
import UserFacadeInterface, {
  InputFindUserFacadeDto,
  OutputFindUserFacadeDto,
} from './user.facade.interface';

export default class UserFacade implements UserFacadeInterface {
  constructor(
    private userProductUseCase: UseCaseInterface<InputFindUserFacadeDto, OutputFindUserFacadeDto>,
  ) {}

  findUser(input: InputFindUserFacadeDto): Promise<OutputFindUserFacadeDto> {
    return this.userProductUseCase.execute(input);
  }
}
