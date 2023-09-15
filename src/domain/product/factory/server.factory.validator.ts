import Server from '../entity/product.entity';
import ServerValidator from '../validator/server.validator';
import ValidatorInterface from '../../../shared/validator.interface';

export default class ServerValidatorFactory {
  static create(): ValidatorInterface<Server> {
    return new ServerValidator();
  }
}
