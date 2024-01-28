import ForbiddenAccess from '../../../shared/http/errors/forbidden-access.js';
import InvalidParam from '../../../shared/http/errors/invalid-param.js';
import IsValidParamType from '../../../shared/utils/is-valid-param-type.js';
import Notification from '../../../shared/utils/notification.js';
import Param from '../../../shared/utils/param.js';

async function GivenUsersDocumentsAccessService(
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
  const truthyUserIds = users.map((user) => user.id);

  documents.forEach(async (document) => {
    document.userIdsCanAccess.push(...truthyUserIds);
    await documentRepository.save(documents);
  });

  await notificationProvider.notify(creator, Notification.YOU_GIVEN_USERS_ACCESS_TO_DOCUMENTS);

  users.forEach(async (user) => {
    await notificationProvider.notify(user, Notification.USER_GIVEN_DOCUMENTS_ACCESS_FOR_YOU);
  });
}

export default GivenUsersDocumentsAccessService;
