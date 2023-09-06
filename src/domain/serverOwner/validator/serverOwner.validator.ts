import ValidatorInterface from '../../../shared/validator.interface';
import ServerOwner from '../entity/serverOwner.entity';
import * as z from 'zod';

interface ValidationError {
  message: string;
  path: (string | number)[];
}

export default class ServerOwnerValidator implements ValidatorInterface<ServerOwner> {
  validate(entity: ServerOwner): ValidationError[] | void {
    const serverOwnerSchema = z.object({
      _serverOwnerId: z.string(),
      _name: z.string().min(2, 'Nome inválido'),
      _email: z.string().email('Email inválido'),
      _password: z.string().min(2, 'Senha inválida'),
      _serverId: z.number().optional(),
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
