import ForbiddenAccess from '../../../shared/http/errors/forbidden-access.js';
import InvalidParam from '../../../shared/http/errors/invalid-param.js';
import IsValidParamType from '../../../shared/utils/is-valid-param-type.js';
import Notification from '../../../shared/utils/notification.js';
import Param from '../../../shared/utils/param.js';
import Permission from '../../../shared/utils/permission.js';
import CreateChangeLogEntity from '../domain/create-change-log-entity.js';

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
    const changeLog = CreateChangeLogEntity({
      user: creator,
      action: Permission.UPDATE,
      description: 'given users access',
    });

    document.changeLogs.push(changeLog);
    document.userIdsCanAccess.push(...truthyUserIds);

    await documentRepository.save(document);
  });

  await notificationProvider.notify(creator, Notification.YOU_GIVEN_USERS_ACCESS_TO_DOCUMENTS);

  users.forEach(async (user) => {
    await notificationProvider.notify(user, Notification.USER_GIVEN_DOCUMENTS_ACCESS_FOR_YOU);
  });
}

export default GivenUsersDocumentsAccessService;
