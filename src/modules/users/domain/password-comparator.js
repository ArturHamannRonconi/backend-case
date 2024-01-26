import { compare } from 'bcrypt';

async function PasswordComparator(password, hash) {
  return compare(password, hash);
}

export default PasswordComparator;
