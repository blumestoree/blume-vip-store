import UseCaseInterface from '../../../shared/usecase.interface';
import PaymentFacadeInterface, {
  InputPaymentFacadeDto,
  OutputPaymentFacadeDto,
} from './payment.facade.interface';

export default class PaymentFacade implements PaymentFacadeInterface {
  constructor(
    private processPaymentUseCase: UseCaseInterface<InputPaymentFacadeDto, OutputPaymentFacadeDto>,
  ) {}

  process(input: InputPaymentFacadeDto): Promise<OutputPaymentFacadeDto> {
    return this.processPaymentUseCase.execute(input);
  }
}
