import AddItemToPlayer from '../../../infrastructure/server/addItemGame/addItemToPlayer.service';
import AddItemToUserUseCase from './addProductToUser.server.usecase';

export default class AddItemToUserUsecaseFactory {
  static create() {
    return new AddItemToUserUseCase(new AddItemToPlayer());
  }
}
