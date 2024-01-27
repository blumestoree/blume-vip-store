import { ValidationError } from '../../../shared/types/IValidationError';
import ValidatorInterface from '../../../shared/validator.interface';
import Product from '../entity/product.entity';
import * as z from 'zod';

export default class ProductValidator implements ValidatorInterface<Product> {
  validate(entity: Product): ValidationError[] | void {
    const productSchema = z.object({
      _id: z.string(),
      _price: z.number(),
      _name: z.string().min(2, 'Nome inválido'),
      _categoryId: z.string(),
      _category: z.any(),
      _image: z.string(),
      _serverId: z.string(),
      _gameItemName: z.string(),
    });
    try {
      productSchema.parse(entity);
    } catch (error) {
      const zodError = error as z.ZodError;
      const errorMessages = zodError.errors.map((issue) => issue.message);
      throw new Error(errorMessages.map((issue) => issue).join(', '));
    }
  }
}
