import StatusCode from '../../../../shared/utils/status-code.js';
import DocumentRepository from '../database/document-repository.js';
import GivenUserDocumentAccessService from '../../services/given-user-document-access-service.js';

async function GivenUserDocumentAccessController(request, response) {
  const { user } = request;
  const { userIds, documentIds } = request.body;

  const repository = DocumentRepository();
  const input = { creator: user, userIds, documentIds };

  const output = await GivenUserDocumentAccessService(repository, input);

  return response
    .status(StatusCode.NO_CONTENT)
    .json(output);
}

export default GivenUserDocumentAccessController;
