import { PrismaClient } from '@prisma/client';
import PaymentRepositoryInterface from '../../../domain/payment/repositories/payment.repository';
import Payment from '../../../domain/payment/entity/payment.entity';

export default class PaymentRepository implements PaymentRepositoryInterface {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async save(entity: Payment): Promise<void> {
    console.log(entity);
  }
}
