import Payment from '../entity/payment.entity';
import { v4 as uuid } from 'uuid';

export default class PaymentFacture {
  static create(amount: number, status?: string, id?: string): Payment {
    return new Payment(id || uuid(), amount, status);
  }
}
