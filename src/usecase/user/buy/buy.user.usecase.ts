import UseCaseInterface from '../../../shared/usecase.interface';
import { InputCreatePaymentDto, OutputCreatePaymentDto } from './buy.user.dto';
import PaymentFactory from '../../../domain/payment/factory/payment.factory';
import ProductFacadeInterface from '../../../domain/product/facade/product.facade.interface';
import PaymentFacadeInterface from '../../../domain/payment/facade/payment.facade.interface';
import UserServiceInterface from '../../../domain/user/service/user.facade.interface';
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
    private userService: UserServiceInterface,
  ) {}

  async execute(input: InputCreatePaymentDto): Promise<OutputCreatePaymentDto> {
    const user = await this.userRepository.find(input.userId);

    if (!user) {
      throw new Error('User not found');
    }

    const product = await this.productFacade.findProduct({ id: input.productId });
    if (!product) {
      throw new Error('Product not found');
    }

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
        email: 'avengerstark@ligadajustica.com.br',
      },
      payments: [
        {
          payment_method: PaymentMethod[paymentMethod],
          credit_card: {
            recurrence: false,
            installments: 1,
            card: {
              number: '4000000000000010',
              holder_name: user.name,
              exp_month: 1,
              exp_year: 30,
              cvv: '3531',
            },
          },
        },
      ],
    };

    await this.userService.userPurchase(paymentDto);

    await this.paymentFacade.createPayment(payment);

    return {
      id: payment.id,
      amount: payment.amount,
      userId: payment.userId,
      productId: payment.productId,
    };
  }
}
