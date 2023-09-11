import ValidatorInterface from '../../../shared/validator.interface';
import Server from '../entity/server.entity';
import * as z from 'zod';

interface ValidationError {
  message: string;
  path: (string | number)[];
}

export default class ServerValidator implements ValidatorInterface<Server> {
  validate(entity: Server): ValidationError[] | void {
    const serverOwnerSchema = z.object({
      _serverId: z.string(),
      _name: z.string().min(2, 'Nome inválido'),
    });
    try {
      serverOwnerSchema.parse(entity);
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
