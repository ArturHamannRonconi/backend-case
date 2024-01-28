import ForbiddenAccess from '../../../shared/http/errors/forbidden-access.js';

async function GivenUserDocumentAccessService(repository, input) {
  const { creator, userIds, documentIds } = input;

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

export default GivenUserDocumentAccessService;
