import StatusCode from '../../../../shared/utils/status-code.js';
import DocumentRepository from '../database/document-repository.js';
import GivenUsersDocumentsAccessService from '../../services/given-users-documents-access-service.js';

async function GivenUsersDocumentsAccessController(request, response) {
  const { user } = request;
  const { userIds, documentIds } = request.body;

  const repository = DocumentRepository();
  const input = { creator: user, userIds, documentIds };

  const output = await GivenUsersDocumentsAccessService(repository, input);

  return response
    .status(StatusCode.NO_CONTENT)
    .json(output);
}

export default GivenUsersDocumentsAccessController;
