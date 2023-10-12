import ValidatorInterface from '../../../shared/validator.interface';
import Payment from '../entity/payment.entity';
import PaymentValidator from '../validator/payment.validator';

export default class PaymentValidatorFactory {
  static create(): ValidatorInterface<Payment> {
    return new PaymentValidator();
  }
}
