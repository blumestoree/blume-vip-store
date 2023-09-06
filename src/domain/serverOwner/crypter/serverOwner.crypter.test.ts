import { describe, expect, it } from 'vitest';
import ServerOwnerCrypterFactory from '../factory/serverOwner.factory.crypter';

describe('ServerOwner crypter unit test', () => {
  it('should encrypt ServerOwner password', () => {
    const serverOwner = ServerOwnerCrypterFactory.create().crypter('password');
    expect(serverOwner).not.toBeNull();
  });
});
