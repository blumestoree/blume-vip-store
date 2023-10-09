import UseCaseInterface from '../../../shared/usecase.interface';
import { InputCreatePaymentDto, OutputCreatePaymentDto } from './buy.user.dto';
import PaymentFactory from '../../../domain/payment/factory/payment.factory';
import ProductFacadeInterface from '../../../domain/product/facade/product.facade.interface';
import UserFacadeInterface from '../../../domain/user/facade/user.facade.interface';
import PaymentFacadeInterface from '../../../domain/payment/facade/payment.facade.interface';
import UserServiceInterface from '../../../domain/user/service/user.facade.interface';

export default class UserBuyProductUseCase
  implements UseCaseInterface<InputCreatePaymentDto, OutputCreatePaymentDto>
{
  constructor(
    private paymentFacade: PaymentFacadeInterface,
    private productFacade: ProductFacadeInterface,
    private userFacade: UserFacadeInterface,
    private userService: UserServiceInterface,
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
        type: 'individual',
        email: 'avengerstark@ligadajustica.com.br',
        document: '03154435026',
        document_type: 'CPF',
        phones: {
          mobile_phone: {
            country_code: '23',
            area_code: '23',
            number: '999293823',
          },
        },
      },
      payments: [
        {
          payment_method: 'credit_card',
          credit_card: {
            recurrence: false,
            installments: 1,
            statement_descriptor: 'AVENGERS',
            card: {
              number: '4000000000000010',
              holder_name: user.name,
              exp_month: 1,
              exp_year: 30,
              cvv: '3531',
            },
          },
          capture: true,
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
