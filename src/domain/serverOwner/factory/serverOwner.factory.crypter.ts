import CrypterInterface from '../../../shared/crypter.interface';
import ServerOwnerCrypter from '../crypter/serverOwner.crypter';

export default class ServerOwnerCrypterFactory {
  static create(): CrypterInterface {
    return new ServerOwnerCrypter();
  }
}
