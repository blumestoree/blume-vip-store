import { ValidationError } from '../../../shared/types/IValidationError';
import ValidatorInterface from '../../../shared/validator.interface';
import * as z from 'zod';
import Payment from '../entity/payment.entity';

export default class PaymentValidator implements ValidatorInterface<Payment> {
  validate(entity: Payment): ValidationError[] | void {
    const paymentSchema = z.object({
      _amount: z.number(),
      _userId: z.string(),
      _productId: z.array(z.string()),
    });
    try {
      paymentSchema.parse(entity);
    } catch (error) {
      const zodError = error as z.ZodError;
      const errorMessages = zodError.errors.map((issue) => issue.message);
      throw new Error(errorMessages.map((issue) => issue).join(', '));
    }
  }
}
