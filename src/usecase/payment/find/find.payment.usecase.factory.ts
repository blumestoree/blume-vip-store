import PaymentRepository from '../../../infrastructure/payment/repositories/payment.repository';
import FindPaymentUseCase from './find.payment.usecase';

export default class FindPaymentUsecaseFactory {
  static create() {
    return new FindPaymentUseCase(new PaymentRepository());
  }
}
