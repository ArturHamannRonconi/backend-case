import EmailValidator from '../domain/email-validator.js';
import TokensGenerator from '../domain/tokens-generator.js';
import PasswordValidator from '../domain/password-validator.js';
import PasswordComparator from '../domain/password-comparator.js';
import InvalidCredentials from '../../../shared/http/errors/invalid-credentials.js';

async function LoginService(repository, input) {
  const { email, password } = input;

  EmailValidator(email);
  PasswordValidator(password);

  const user = await repository.findByEmail(email);
  if (!user) throw InvalidCredentials();

  const isCorrectPassword = await PasswordComparator(password, user.password);
  if (!isCorrectPassword) throw InvalidCredentials();

  const tokens = await TokensGenerator(user.id);

  return { tokens };
}

export default LoginService;
