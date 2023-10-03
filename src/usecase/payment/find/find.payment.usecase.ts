import PaymentRepositoryInterface from '../../../domain/payment/repositories/payment.repository';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputFindPaymentDto, OutputFindPaymentDto } from './find.payment.dto';

export default class FindPaymentUseCase
  implements UseCaseInterface<InputFindPaymentDto, OutputFindPaymentDto>
{
  constructor(private paymentRepository: PaymentRepositoryInterface) {}

  async execute(input: InputFindPaymentDto): Promise<OutputFindPaymentDto> {
    const payment = await this.paymentRepository.find(input.id);
    return {
      id: payment.id,
      amount: payment.amount,
      userId: payment.userId,
      productId: payment.productId,
    };
  }
}
