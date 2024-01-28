import UserRepository from '../database/user-repository.js';
import StatusCode from '../../../../shared/utils/status-code.js';
import ReadAdminUsersPermissionsService from '../../services/read-admin-users-permissions-service.js';

async function ReadAdminUsersPermissionsController(request, response) {
  const { user } = request;

  const repository = UserRepository();

  const input = { user };
  const output = await ReadAdminUsersPermissionsService(repository, input);

  return response
    .status(StatusCode.OK)
    .json(output);
}

export default ReadAdminUsersPermissionsController;
