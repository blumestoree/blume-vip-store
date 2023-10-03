import UseCaseInterface from '../../../shared/usecase.interface';
import { InputCreatePaymentDto, OutputCreatePaymentDto } from './buy.user.dto';
import PaymentFactory from '../../../domain/payment/factory/payment.factory';
import ProductFacadeInterface from '../../../domain/product/facade/product.facade.interface';
import UserFacadeInterface from '../../../domain/user/facade/user.facade.interface';
import PaymentFacadeInterface from '../../../domain/payment/facade/payment.facade.interface';

export default class UserBuyProductUseCase
  implements UseCaseInterface<InputCreatePaymentDto, OutputCreatePaymentDto>
{
  constructor(
    private paymentFacade: PaymentFacadeInterface,
    private productFacade: ProductFacadeInterface,
    private userFacade: UserFacadeInterface,
  ) {}

  async execute(input: InputCreatePaymentDto): Promise<OutputCreatePaymentDto> {
    const user = await this.userFacade.findUser({ id: input.userId });
    if (!user) {
      throw new Error('User not found');
    }

    const product = await this.productFacade.findProduct({ id: input.productId });
    if (!product) {
      throw new Error('Product not found');
    }

    const payment = PaymentFactory.create(input.userId, input.productId, product.price);
    //LOGIC PAYMENT
    await this.paymentFacade.createPayment(payment);

    return {
      id: payment.id,
      amount: payment.amount,
      userId: payment.userId,
      productId: payment.productId,
    };
  }
}
