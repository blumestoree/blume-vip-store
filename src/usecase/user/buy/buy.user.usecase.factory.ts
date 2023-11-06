import PaymentFacade from '../../../domain/payment/facade/payment.facade';
import ProductFacade from '../../../domain/product/facade/product.facade';
import UserRepository from '../../../infrastructure/user/repositories/user.repository';
import CreatePaymentUsecaseFactory from '../../payment/create/create.payment.usecase.factory';
import FindByIdsAllProductUsecaseFactory from '../../product/findByIds/findByIds.product.usecase.factory';
import ProcessPayment from '../../../infrastructure/user/processPayment/processPayment.service';
import UserBuyProductUseCase from './buy.user.usecase';

export default class BuyUserUsecaseFactory {
  static create() {
    const userRepository = new UserRepository();

    const productUseCase = FindByIdsAllProductUsecaseFactory.create();
    const paymentUseCase = CreatePaymentUsecaseFactory.create();

    const facadePayment = new PaymentFacade(paymentUseCase);
    const facadeProduct = new ProductFacade(productUseCase);

    const processPayment = new ProcessPayment();

    return new UserBuyProductUseCase(facadePayment, facadeProduct, userRepository, processPayment);
  }
}
