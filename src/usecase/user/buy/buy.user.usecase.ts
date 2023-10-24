import UseCaseInterface from '../../../shared/usecase.interface';
import { InputCreatePaymentDto, OutputCreatePaymentDto } from './buy.user.dto';
import PaymentFactory from '../../../domain/payment/factory/payment.factory';
import ProductFacadeInterface from '../../../domain/product/facade/product.facade.interface';
import PaymentFacadeInterface from '../../../domain/payment/facade/payment.facade.interface';
import ProcessPaymentInterface from './processPayment/processPayment.interface';
import UserRepositoryInterface from '../../../domain/user/repositories/user.repository';

enum PaymentMethod {
  credit_card = 'credit_card',
  debit_card = 'debit_card',
}

export default class UserBuyProductUseCase
  implements UseCaseInterface<InputCreatePaymentDto, OutputCreatePaymentDto>
{
  constructor(
    private paymentFacade: PaymentFacadeInterface,
    private productFacade: ProductFacadeInterface,
    private userRepository: UserRepositoryInterface,
    private processPayment: ProcessPaymentInterface,
  ) {}

  async execute(input: InputCreatePaymentDto): Promise<OutputCreatePaymentDto> {
    const user = await this.userRepository.find(input.userId);
    const product = await this.productFacade.findProduct({ id: input.productId });

    const payment = PaymentFactory.create(input.userId, input.productId, product.price);

    const paymentMethod = 'credit_card';

    const paymentDto = {
      items: [
        {
          amount: product.price,
          description: product.name,
          quantity: 1,
          code: product.id,
        },
      ],
      customer: {
        name: user.name,
        email: user.email,
      },
      payments: [
        {
          payment_method: PaymentMethod[paymentMethod],
          credit_card: {
            recurrence: false,
            installments: input.installments,
            card: {
              number: input.cardNumber,
              holder_name: input.holderName,
              exp_month: input.expMonth,
              exp_year: input.expYear,
              cvv: input.cvv,
            },
          },
        },
      ],
    };

    await this.processPayment.userPurchase(paymentDto);

    await this.paymentFacade.createPayment(payment);

    return {
      id: payment.id,
      amount: payment.amount,
      userId: payment.userId,
      productId: payment.productId,
    };
  }
}
