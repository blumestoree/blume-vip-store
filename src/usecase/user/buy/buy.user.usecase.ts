import UseCaseInterface from '../../../shared/usecase.interface';
import { InputCreatePaymentDto, OutputCreatePaymentDto } from './buy.user.dto';
import PaymentFactory from '../../../domain/payment/factory/payment.factory';
import ProductFacadeInterface from '../../../domain/product/facade/product.facade.interface';
import PaymentFacadeInterface from '../../../domain/payment/facade/payment.facade.interface';
import ProcessPaymentInterface from '../../../infrastructure/user/processPayment/processPayment.interface';
import UserRepositoryInterface from '../../../domain/user/repositories/user.repository';
import AddItemToPlayerInterface from '../../../infrastructure/server/addItemGame/addItemToPlayer.interface';

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
    private addItemToPlayer: AddItemToPlayerInterface,
  ) {}

  async execute(input: InputCreatePaymentDto): Promise<OutputCreatePaymentDto> {
    const user = await this.userRepository.find(input.userId);
    const products = await this.productFacade.findProductsByIds({ id: input.productId });

    const sumOfProductsPrices = products.reduce(
      (accumulator, product) => accumulator + product.price,
      0,
    );

    const paymentMethod = 'credit_card';

    const paymentDto = {
      items: products.map((product) => {
        return {
          amount: product.price,
          description: product.name,
          quantity: 1,
          code: product.id,
        };
      }),
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
              number: input.cardInfos.cardNumber,
              holder_name: input.cardInfos.holderName,
              exp_month: input.cardInfos.expMonth,
              exp_year: input.cardInfos.expYear,
              cvv: input.cardInfos.cvv,
            },
          },
        },
      ],
    };

    await this.processPayment.userPurchase(paymentDto);

    const payment = PaymentFactory.create(input.userId, input.productId, sumOfProductsPrices);

    await this.paymentFacade.createPayment(payment);

    await this.addItemToPlayer.addItem({
      token: input.token,
      functionInGame: input.functionInGame,
      gameUserId: input.gameUserId,
      gameItemName: input.gameItemName,
    });

    return {
      id: payment.id,
      amount: payment.amount,
      userId: payment.userId,
      productId: payment.productId,
    };
  }
}
