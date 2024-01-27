import axios from 'axios';
import ProcessPaymentInterface, { InputProcessPaymentDto } from './processPayment.interface';
import { env } from '../../../app/env';

export default class ProcessPayment implements ProcessPaymentInterface {
  async userPurchase(paymentData: InputProcessPaymentDto) {
    try {
      const response = await axios.post(`${env.API_PAGARME_ENDPOINT}/orders`, paymentData, {
        headers: {
          Authorization: 'Basic ' + Buffer.from(env.API_KEY_PAGARME + ':').toString('base64'),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error when calling the payment route');
    }
  }
}
