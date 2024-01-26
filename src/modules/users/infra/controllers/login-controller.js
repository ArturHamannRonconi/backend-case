import LoginService from '../../services/login-service.js';
import UserRepository from '../database/user-repository.js';
import StatusCode from '../../../../shared/utils/status-code.js';

async function LoginController(request, response) {
  const { email, password } = request.body;

  const repository = UserRepository();
  const input = { email, password };
  const output = await LoginService(repository, input);

  return response
    .status(StatusCode.OK)
    .json(output);
}

export default LoginController;
