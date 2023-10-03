import UseCaseInterface from '../../../shared/usecase.interface';
import PaymentFacadeInterface, {
  InputCreatePaymentFacadeDto,
  OutputCreatePaymentFacadeDto,
} from './payment.facade.interface';

export default class PaymentFacade implements PaymentFacadeInterface {
  constructor(
    private processPaymentUseCase: UseCaseInterface<
      InputCreatePaymentFacadeDto,
      OutputCreatePaymentFacadeDto
    >,
  ) {}

  createPayment(input: InputCreatePaymentFacadeDto): Promise<OutputCreatePaymentFacadeDto> {
    return this.processPaymentUseCase.execute(input);
  }
}
