import ServerOwner from '../entity/serverOwner.entity';
import ServerOwnerValidator from '../validator/serverOwner.validator';
import ValidatorInterface from '../../../shared/validator.interface';

export default class ServerOwnerValidatorFactory {
  static create(): ValidatorInterface<ServerOwner> {
    return new ServerOwnerValidator();
  }
}
