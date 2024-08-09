import User from '../entity/user.entity';
import { v4 as uuid } from 'uuid';

export default class UserFactory {
  static create(
    name: string,
    email: string,
    password: string,
    id?: string,
    payment?: string[],
    userOnServer?: string[],
    refreshToken?: string
  ): User {
    return new User(id || uuid(), name, email, password, userOnServer || [], payment || [], refreshToken);
  }
}
