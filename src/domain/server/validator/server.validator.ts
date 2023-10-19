import { ValidationError } from '../../../shared/types/IValidationError';
import ValidatorInterface from '../../../shared/validator.interface';
import Server from '../entity/server.entity';
import * as z from 'zod';

export default class ServerValidator implements ValidatorInterface<Server> {
  validate(entity: Server): ValidationError[] | void {
    const serverSchema = z.object({
      _name: z.string().min(1, 'Nome inválido'),
      _serverOwnerId: z.string(),
    });
    try {
      serverSchema.parse(entity);
    } catch (error) {
      const zodError = error as z.ZodError;
      const errorMessages = zodError.errors.map((issue) => issue.message);
      throw new Error(errorMessages.map((issue) => issue).join(', '));
    }
  }
}
