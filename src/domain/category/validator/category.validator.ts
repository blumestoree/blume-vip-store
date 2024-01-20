import { ValidationError } from '../../../shared/types/IValidationError';
import ValidatorInterface from '../../../shared/validator.interface';
import Category from '../entity/category.entity';
import * as z from 'zod';

export default class CategoryValidator implements ValidatorInterface<Category> {
  validate(entity: Category): ValidationError[] | void {
    const categorySchema = z.object({
      _id: z.string(),
      _name: z.string().min(2, 'Nome inválido'),
      _functionInGame: z.string(),
      _serverId: z.string(),
      _products: z.any()
    });
    try {
      categorySchema.parse(entity);
    } catch (error) {
      const zodError = error as z.ZodError;
      const errorMessages = zodError.errors.map((issue) => issue.message);
      throw new Error(errorMessages.map((issue) => issue).join(', '));
    }
  }
}
