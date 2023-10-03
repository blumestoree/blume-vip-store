import Payment from '../entity/payment.entity';
import { v4 as uuid } from 'uuid';

export default class PaymentFactory {
  static create(userId: string, productId: string, amount: number, id?: string): Payment {
    return new Payment(id || uuid(), amount, userId, productId);
  }
}
