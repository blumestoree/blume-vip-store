import { describe, expect, it } from 'vitest';
import PaymentFactory from './payment.factory';

describe('Payment factory unit test', () => {
  it('should create a payment', () => {
    const payment = PaymentFactory.create('userId', ['productId'], 100);
    expect(payment.id).not.toBeNull();
    expect(payment.amount).toBe(100);
    expect(payment.userId).toBe('userId');
    expect(payment.productId).not.toBeNull();
  });

  it('should create a payment with id', () => {
    const payment = PaymentFactory.create('userId', ['productId'], 100, 'id');
    expect(payment.id).toBe('id');
    expect(payment.amount).toBe(100);
    expect(payment.userId).toBe('userId');
    expect(payment.productId).toEqual(['productId']);
  });
});
