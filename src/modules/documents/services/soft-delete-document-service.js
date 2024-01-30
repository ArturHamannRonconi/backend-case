import Param from '../../../shared/utils/param.js';
import Permission from '../../../shared/utils/permission.js';
import Notification from '../../../shared/utils/notification.js';
import InvalidParam from '../../../shared/http/errors/invalid-param.js';
import CreateChangeLogEntity from '../domain/create-change-log-entity.js';
import IsValidParamType from '../../../shared/utils/is-valid-param-type.js';
import ForbiddenAccess from '../../../shared/http/errors/forbidden-access.js';

async function SoftDeleteDocumentService(repository, uploadProvider, notificationProvider, input) {
  const { documentId, user } = input;

  const hasInvalidParam = !IsValidParamType(documentId, Param.STRING);
  if (hasInvalidParam) throw InvalidParam('documentId', Param.STRING);

  const document = await repository.findById(documentId);
  const userHasDocumentAccess = document.creatorId === user.id
    || document.userIdsCanAccess.includes(user.id);

  if (!userHasDocumentAccess) throw ForbiddenAccess();

  const deleteMarkerId = await uploadProvider.softDelete(document.name);

  const changeLog = CreateChangeLogEntity({
    user,
    description: 'soft delete document',
    action: Permission.DELETE,
  });

  document.changeLogs.push(changeLog);
  document.deleteMarkerId = deleteMarkerId;

  await repository.save(document);
  await notificationProvider.notify(user, Notification.YOU_SOFT_DELETED_A_DOCUMENT);
}

export default SoftDeleteDocumentService;
