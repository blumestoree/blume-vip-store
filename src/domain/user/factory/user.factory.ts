import User from '../entity/user.entity';
import { v4 as uuid } from 'uuid';

export default class UserFactory {
  static create(
    name: string,
    gameUserId: string,
    email: string,
    password: string,
    userOnServer: string[],
    payment: string[],
    id?: string,
    refreshToken?: string
  ): User {
    return new User(id || uuid(), name, gameUserId, email, password, userOnServer || [], payment || [], refreshToken);
  }
}
