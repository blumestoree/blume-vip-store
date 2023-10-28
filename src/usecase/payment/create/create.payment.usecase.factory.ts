import PaymentRepository from '../../../infrastructure/payment/repositories/payment.repository';
import PaymentUseCase from './create.payment.usecase';

export default class CreatePaymentUsecaseFactory {
  static create() {
    return new PaymentUseCase(new PaymentRepository());
  }
}
