import UserRepository from '../database/user-repository.js';
import StatusCode from '../../../../shared/utils/status-code.js';
import ManageUserPermissionsService from '../../services/manage-user-permissions-service.js';

async function ManageUserPermissionsController(request, response) {
  const { user } = request;
  const { userId, permissions } = request.body;

  const repository = UserRepository();
  const input = { admin: user, userId, permissions };
  const output = await ManageUserPermissionsService(repository, input);

  return response
    .status(StatusCode.OK)
    .json(output);
}

export default ManageUserPermissionsController;
