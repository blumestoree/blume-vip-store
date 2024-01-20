import axios from 'axios';
import AddItemToPlayerInterface, { InputAddItemToPlayertDto } from './addItemToPlayer.interface';
import { env } from '../../../app/env';

export default class AddItemToPlayer implements AddItemToPlayerInterface {
  async addItem(data: InputAddItemToPlayertDto) {
    try {
      const response = await axios.post(
        `${env.GAME_URL}/acquireBenefit`,
        {
          functionInGame: data.functionInGame,
          gameUserId: data.gameUserId,
          gameItemName: data.gameItemName,
        },
        {
          headers: {
            Authorization: 'Bearer ' + data.token,
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new Error('Error when acquire benefit');
    }
  }
}
