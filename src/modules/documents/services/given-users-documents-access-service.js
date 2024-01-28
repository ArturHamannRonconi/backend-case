import ForbiddenAccess from '../../../shared/http/errors/forbidden-access.js';
import InvalidParam from '../../../shared/http/errors/invalid-param.js';
import IsValidParamType from '../../../shared/utils/is-valid-param-type.js';
import Param from '../../../shared/utils/param.js';

async function GivenUsersDocumentsAccessService(repository, input) {
  const { creator, userIds, documentIds } = input;

  const validations = [
    IsValidParamType(userIds, Param.ARRAY),
    IsValidParamType(documentIds, Param.ARRAY),
    userIds.every((id) => IsValidParamType(id, Param.STRING)),
    documentIds.every((id) => IsValidParamType(id, Param.STRING)),
  ];

  const hasInvalidParam = validations.some((valid) => !valid);
  if (hasInvalidParam) return InvalidParam('ids', Param.ARRAY);

  const documents = await repository.findManyByIds(documentIds);
  const someDocumentUserIsNotCreator = documents
    .some((document) => document.creatorId !== creator.id);

  if (someDocumentUserIsNotCreator) {
    throw ForbiddenAccess();
  }

  documents.forEach(async (document) => {
    document.userIdsCanAccess.push(...userIds);
    await repository.save(documents);
  });
}

export default GivenUsersDocumentsAccessService;
