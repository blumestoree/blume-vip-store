import axios from 'axios';
import AddItemToPlayerInterface, { InputAddItemToPlayertDto } from './addItemToPlayer.interface';

export default class AddItemToPlayer implements AddItemToPlayerInterface {
  async addItemToPlayer(data: InputAddItemToPlayertDto) {
    try {
      const response = await axios.post(
        `${process.env.GAME_URL}/acquireBenefit`,
        {
          func: data.func,
          params: {
            user_id: data.params.user_id,
            item: data.params.item,
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
