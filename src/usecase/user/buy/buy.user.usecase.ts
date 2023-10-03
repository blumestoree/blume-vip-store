import UseCaseInterface from '../../../shared/usecase.interface';
import { InputCreatePaymentDto, OutputCreatePaymentDto } from './buy.user.dto';
import PaymentFactory from '../../../domain/payment/factory/payment.factory';
import ProductFacadeInterface from '../../../domain/product/facade/product.facade.interface';
// import Product from '../../../domain/product/entity/product.entity';
// import ProductFactory from '../../../domain/product/factory/product.factory';
// import UserFactory from '../../../domain/user/factory/user.factory';
import UserFacadeInterface from '../../../domain/user/facade/user.facade.interface';
// import User from '../../../domain/user/entity/user.entity';
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
    // await this.getProduct(input.productId);
    // await this.getUser(input.userId);

    const user = await this.userFacade.findUser({ userId: input.userId });
    if (!user) {
      throw new Error('User not found');
    }

    const product = await this.productFacade.findProduct({ productId: input.productId });
    if (!product) {
      throw new Error('Product not found');
    }

    const payment = PaymentFactory.create(input.userId, input.productId, input.price);
    //LOGIC PAYMENT
    await this.paymentFacade.createPayment(payment);

    return {
      id: payment.id,
      amount: payment.amount,
      userId: payment.userId,
      productId: payment.productId,
    };
  }

  // private getProduct = async (productId: number): Promise<Product> => {
  //   const product = await this.productFacade.findProduct({ productId });
  //   if (!product) {
  //     throw new Error('User not found');
  //   }
  //   return ProductFactory.create(product.name, product.price, product.serverId);
  // };

  // private getUser = async (userId: number): Promise<User> => {
  //   const user = await this.userFacade.findUser({ userId });
  //   if (!user) {
  //     throw new Error('User not found');
  //   }
  //   return UserFactory.create(user.name, user.email, user.password);
  // };
}
