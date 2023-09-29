import PaymentRepository from '../../../infrastructure/payment/repository/payment.repository';
import PaymentProcessUseCase from '../../../usecase/payment/create/create.payment.usecase';
import PaymentFacade from '../facade/payment.facade';
import PaymentFacadeInterface from '../facade/payment.facade.interface';

export default class PaymentFacadeFacture {
  static create(): PaymentFacadeInterface {
    const repository = new PaymentRepository();
    const usecase = new PaymentProcessUseCase(repository);
    const facade = new PaymentFacade(usecase);
    return facade;
  }
}
