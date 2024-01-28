import ForbiddenAccess from '../../../shared/http/errors/forbidden-access.js';

async function ReadAdminUsersPermissionsService(repository, input) {
  const { user } = input;

  if (!user.isAdmin) throw ForbiddenAccess();

  const users = await repository.findAll();

  return { users };
}

export default ReadAdminUsersPermissionsService;
