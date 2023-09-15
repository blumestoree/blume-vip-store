import ValidatorInterface from '../../../shared/validator.interface';
import Product from '../entity/product.entity';
import * as z from 'zod';

interface ValidationError {
  message: string;
  path: (string | number)[];
}

export default class ProductValidator implements ValidatorInterface<Product> {
  validate(entity: Product): ValidationError[] | void {
    const productSchema = z.object({
      _productId: z.string(),
      _name: z.string().min(2, 'Nome inválido'),
      _price: z.number(),
    });
    try {
      productSchema.parse(entity);
    } catch (error) {
      const zodError = error as z.ZodError;
      const errorMessages = zodError.errors.map((issue) => ({
        message: issue.message,
        path: issue.path,
      }));
      throw errorMessages;
    }
  }
}
