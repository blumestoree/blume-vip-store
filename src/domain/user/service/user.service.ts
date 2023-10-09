import axios from 'axios';
import UserServiceInterface, { InputUserPurchaseDto } from './user.facade.interface';

export default class UserService implements UserServiceInterface {
  async userPurchase(paymentData: InputUserPurchaseDto) {
    try {
      const response = await axios.post(`${process.env.API_PAGARME_ENDPOINT}/orders`, paymentData, {
        headers: {
          Authorization:
            'Basic ' + Buffer.from(process.env.API_KEY_PAGARME + ':').toString('base64'),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error when calling the payment route');
    }
  }
}
