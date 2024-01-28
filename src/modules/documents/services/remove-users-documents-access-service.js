import Param from '../../../shared/utils/param.js';
import Notification from '../../../shared/utils/notification.js';
import InvalidParam from '../../../shared/http/errors/invalid-param.js';
import IsValidParamType from '../../../shared/utils/is-valid-param-type.js';
import ForbiddenAccess from '../../../shared/http/errors/forbidden-access.js';

async function RemoveUsersDocumentsAccessService(
  userRepository,
  documentRepository,
  notificationProvider,
  input,
) {
  const { creator, userIds, documentIds } = input;

  const validations = [
    IsValidParamType(userIds, Param.ARRAY),
    IsValidParamType(documentIds, Param.ARRAY),
    userIds.every((id) => IsValidParamType(id, Param.STRING)),
    documentIds.every((id) => IsValidParamType(id, Param.STRING)),
  ];

  const hasInvalidParam = validations.some((valid) => !valid);
  if (hasInvalidParam) return InvalidParam('ids', Param.ARRAY);

  const documents = await documentRepository.findManyByIds(documentIds);
  const someDocumentUserIsNotCreator = documents
    .some((document) => document.creatorId !== creator.id);

  if (someDocumentUserIsNotCreator) {
    throw ForbiddenAccess();
  }

  const users = await userRepository.findManyByIds(userIds);

  documents.forEach(async (document) => {
    const truthyUserIds = users.map((user) => user.id);
    const indexes = truthyUserIds.map((id) => document.userIdsCanAccess.indexOf(id));

    indexes.forEach((index) => {
      document.userIdsCanAccess.splice(index, 1);
    });

    await documentRepository.save(documents);
  });

  await notificationProvider.notify(creator, Notification.YOU_REMOVE_USERS_ACCESS_FROM_DOCUMENTS);

  users.forEach(async (user) => {
    await notificationProvider.notify(user, Notification.USER_REMOVE_DOCUMENTS_ACCESS_FROM_YOU);
  });
}

export default RemoveUsersDocumentsAccessService;
