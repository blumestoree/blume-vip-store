import CrypterInterface from '../../../shared/crypter.interface';
import UserCrypter from '../../serverOwner/crypter/serverOwner.crypter';

export default class UserCrypterFactory {
  static create(): CrypterInterface {
    return new UserCrypter();
  }
}
