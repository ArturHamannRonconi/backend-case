import Param from '../../../shared/utils/param.js';
import Permission from '../../../shared/utils/permission.js';
import Notification from '../../../shared/utils/notification.js';
import InvalidParam from '../../../shared/http/errors/invalid-param.js';
import CreateChangeLogEntity from '../domain/create-change-log-entity.js';
import IsValidParamType from '../../../shared/utils/is-valid-param-type.js';
import ForbiddenAccess from '../../../shared/http/errors/forbidden-access.js';

async function RestoreDocumentService(repository, uploadProvider, notificationProvider, input) {
  const { documentId, user } = input;

  const validations = [
    IsValidParamType(documentId, Param.STRING),
  ];

  const hasInvalidParam = validations.some((valid) => !valid);
  if (hasInvalidParam) return InvalidParam('ids', Param.STRING);

  const document = await repository.findById(documentId);
  const userHasDocumentAccess = document.creatorId === user.id
    || document.userIdsCanAccess.includes(user.id);

  if (!userHasDocumentAccess) throw ForbiddenAccess();

  await uploadProvider.restoreDocument(document);

  const changeLog = CreateChangeLogEntity({
    user,
    description: 'restore document',
    action: Permission.UPDATE,
  });

  document.changeLogs.push(changeLog);
  document.deleteMarkerId = undefined;

  await repository.save(document);
  await notificationProvider.notify(user, Notification.YOU_RESTORE_A_DOCUMENT);
}

export default RestoreDocumentService;
