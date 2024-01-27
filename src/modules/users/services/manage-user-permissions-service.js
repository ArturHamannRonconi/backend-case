import Notification from '../../../shared/utils/notification.js';
import PermissionsValidator from '../domain/permissions-validator.js';
import UserNotFound from '../../../shared/http/errors/user-not-found.js';
import ForbiddenAccess from '../../../shared/http/errors/forbidden-access.js';

async function ManageUserPermissionsService(repository, notificationProvider, input) {
  const { admin, userId, permissions } = input;

  if (!admin.isAdmin) throw ForbiddenAccess();

  const user = await repository.findById(userId);

  if (!user) throw UserNotFound();
  if (user.isAdmin) throw ForbiddenAccess();

  PermissionsValidator(permissions);

  user.permissions = permissions;
  await repository.save(user);

  await notificationProvider.notify(user, Notification.USER_CHANGED_YOUR_PERMISSIONS);
  await notificationProvider.notify(admin, Notification.YOU_CHANGED_USER_PERMISSIONS);

  return { userId: user.id, permissions: user.permissions };
}

export default ManageUserPermissionsService;
