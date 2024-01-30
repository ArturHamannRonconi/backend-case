import { uid } from 'uid';
import { hash } from 'bcrypt';

import PasswordComparator from '../../../../src/modules/users/domain/password-comparator.js';

describe('password-comparator.spec', () => {
  let password;

  beforeEach(() => {
    password = uid(16);
  });

  it('should compare with correct password', async () => {
    const newHash = await hash(password, 12);
    const comparation = await PasswordComparator(password, newHash);

    expect(comparation).toBeTruthy();
  });

  it('should fail with invalid passwords', async () => {
    const newHash = await hash(password, 12);
    const comparation1 = await PasswordComparator('password', newHash);
    const comparation2 = await PasswordComparator(newHash, newHash);
    const comparation3 = await PasswordComparator(newHash, password);
    const comparation4 = await PasswordComparator('password', password);

    expect(comparation1).toBeFalsy();
    expect(comparation2).toBeFalsy();
    expect(comparation3).toBeFalsy();
    expect(comparation4).toBeFalsy();
  });
});
