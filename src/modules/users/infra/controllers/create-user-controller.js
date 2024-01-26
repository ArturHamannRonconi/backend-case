import UserRepository from '../database/user-repository.js';
import StatusCode from '../../../../shared/utils/status-code.js';
import CreateUserService from '../../services/create-user-service.js';

async function CreateUserController(request, response) {
  const { email, password, isAdmin } = request.body;

  const repository = UserRepository();
  const input = { email, password, isAdmin };
  const output = await CreateUserService(repository, input);

  return response
    .status(StatusCode.CREATED)
    .json(output);
}

export default CreateUserController;
