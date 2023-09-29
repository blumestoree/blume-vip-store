import UseCaseInterface from '../../../shared/usecase.interface';
import { InputCreatePaymentDto, OutputCreatePaymentDto } from './create.payment.dto';
import PaymentRepositoryInterface from '../../../domain/payment/repositories/payment.repository';
import PaymentFacture from '../../../domain/payment/factory/payment.factory';

export default class PaymentProcessUseCase
  implements UseCaseInterface<InputCreatePaymentDto, OutputCreatePaymentDto>
{
  constructor(private paymentRepository: PaymentRepositoryInterface) {}

  async execute(input: InputCreatePaymentDto): Promise<OutputCreatePaymentDto> {
    const payment = PaymentFacture.create(input.amount, input.id);
    //LOGIC PAYMENT
    await this.paymentRepository.save(payment);

    return {
      id: payment.id,
      amount: payment.amount,
    };
  }
}
