import CreateUserEntity from '../domain/user-entity.js';
import UserEmailAlreadyExists from '../../../shared/http/errors/user-email-already-exists.js';

async function CreateUserService(repository, input) {
  const { email, password, isAdmin } = input;

  const userAlreadyExists = await repository.findByEmail(email);
  if (userAlreadyExists) throw UserEmailAlreadyExists();

  const user = await CreateUserEntity({ email, password, isAdmin });

  await repository.save(user);

  return { id: user.id };
}

export default CreateUserService;
