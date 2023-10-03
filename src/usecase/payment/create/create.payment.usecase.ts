import UseCaseInterface from '../../../shared/usecase.interface';
import { InputCreatePaymentDto, OutputCreatePaymentDto } from './create.payment.dto';
import PaymentRepositoryInterface from '../../../domain/payment/repositories/payment.repository';
import PaymentFactory from '../../../domain/payment/factory/payment.factory';

export default class PaymentProcessUseCase
  implements UseCaseInterface<InputCreatePaymentDto, OutputCreatePaymentDto>
{
  constructor(private paymentRepository: PaymentRepositoryInterface) {}

  async execute(input: InputCreatePaymentDto): Promise<OutputCreatePaymentDto> {
    const payment = PaymentFactory.create(input.userId, input.productId, input.amount);
    await this.paymentRepository.create(payment);

    return {
      id: payment.id,
      amount: payment.amount,
      userId: payment.userId,
      productId: payment.productId,
    };
  }
}
