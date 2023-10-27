import { PrismaClient } from '@prisma/client';
import PaymentRepositoryInterface from '../../../domain/payment/repositories/payment.repository';
import Payment from '../../../domain/payment/entity/payment.entity';
import PaymentFactory from '../../../domain/payment/factory/payment.factory';

export default class PaymentRepository implements PaymentRepositoryInterface {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(entity: Payment): Promise<void> {
    const createdPayment = await this.prisma.payment.create({
      data: {
        paymentId: entity.id,
        amount: entity.amount,
        userId: entity.userId,
      },
    });

    for (const productId of entity.productId) {
      await this.prisma.product.update({
        where: { productId },
        data: {
          payments: { connect: { paymentId: createdPayment.paymentId } },
        },
      });
    }
  }

  async find(paymentId: string): Promise<Payment> {
    let payment;

    try {
      payment = await this.prisma.payment.findUniqueOrThrow({
        include: { products: true },
        where: { paymentId },
      });
    } catch (error) {
      throw new Error('Payment not found');
    }

    return PaymentFactory.create(
      payment.userId,
      payment.products.map((product) => {
        return product.productId;
      }),
      payment.amount,
      payment.paymentId,
    );
  }
}
