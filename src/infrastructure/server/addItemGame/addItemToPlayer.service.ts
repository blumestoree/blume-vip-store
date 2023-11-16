import axios from 'axios';
import AddItemToPlayerInterface, { InputAddItemToPlayertDto } from './addItemToPlayer.interface';

export default class AddItemToPlayer implements AddItemToPlayerInterface {
  async addItem(data: InputAddItemToPlayertDto) {
    try {
      const response = await axios.post(
        `${process.env.GAME_URL}/acquireBenefit`,
        {
          func: data.function,
          params: {
            user_id: data.gameUserId,
            item: data.gameItemName,
          },
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
