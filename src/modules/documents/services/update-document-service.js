import Param from '../../../shared/utils/param.js';
import UpdateDocument from '../domain/update-document.js';
import Notification from '../../../shared/utils/notification.js';
import IsValidParamType from '../../../shared/utils/is-valid-param-type.js';
import InvalidParam from '../../../shared/http/errors/invalid-param.js';
import ForbiddenAccess from '../../../shared/http/errors/forbidden-access.js';

async function UpdateDocumentService(repository, uploadProvider, notificationProvider, input) {
  const { documentId, file, user } = input;

  const isValidString = IsValidParamType(documentId, Param.STRING);
  if (!isValidString) throw InvalidParam('documentId', Param.STRING);

  const document = await repository.findById(documentId);

  const userHasDocumentAccess = document.creatorId === user.id
    || document.userIdsCanAccess.includes(user.id);

  if (!userHasDocumentAccess) throw ForbiddenAccess();

  const VersionId = await uploadProvider.update(document.name, file.buffer);
  const url = await uploadProvider.getUrl(document.name);
  const updatedDocument = UpdateDocument({
    user, document, file, url, VersionId,
  });

  await repository.save(updatedDocument);

  await notificationProvider.notify(user, Notification.UPLOAD);

  return { documentId, url };
}

export default UpdateDocumentService;
