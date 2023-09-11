import Server from '../entity/server.entity';
import ServerValidator from '../validator/server.validator';
import ValidatorInterface from '../../../shared/validator.interface';

export default class ServerValidatorFactory {
  static create(): ValidatorInterface<Server> {
    return new ServerValidator();
  }
}
