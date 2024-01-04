import AddItemToPlayerInterface from '../../../infrastructure/server/addItemGame/addItemToPlayer.interface';
import UseCaseInterface from '../../../shared/usecase.interface';
import { InputAddItemToUserDto } from './addProductToUser.server.dto';

export default class AddItemToUserUseCase implements UseCaseInterface<InputAddItemToUserDto, void> {
  constructor(private addItemToPlayer: AddItemToPlayerInterface) {}

  async execute(input: InputAddItemToUserDto): Promise<void> {
    await this.addItemToPlayer.addItem(input);
  }
}
