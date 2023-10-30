import { describe, expect, it } from 'vitest';
import Payment from './payment.entity';

describe('Payment unit tests', () => {
  it('should create a payment', () => {
    const payment = new Payment('id', 100, 'userId', ['productId']);
    expect(payment.id).toBe('id');
    expect(payment.amount).toBe(100);
    expect(payment.userId).toBe('userId');
    expect(payment.productId).toEqual(['productId']);
  });
});
