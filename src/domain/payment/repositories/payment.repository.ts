import Payment from '../entity/payment.entity';

export default interface PaymentRepositoryInterface {
  save(input: Payment): Promise<void>;
}
