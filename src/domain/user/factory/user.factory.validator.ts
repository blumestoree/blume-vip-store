import ValidatorInterface from '../../../shared/validator.interface';
import User from '../entity/user.entity';
import UserValidator from '../validator/user.validator';

export default class UserValidatorFactory {
  static create(): ValidatorInterface<User> {
    return new UserValidator();
  }
}
