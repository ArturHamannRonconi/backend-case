import StatusCode from '../../../../shared/utils/status-code.js';
import DocumentRepository from '../database/document-repository.js';
import ReadUserDocumentsService from '../../services/read-user-documents-service.js';

async function ReadUserDocumentsController(request, response) {
  const { user } = request;

  const repository = DocumentRepository();
  const input = { user };

  const output = await ReadUserDocumentsService(repository, input);

  return response
    .status(StatusCode.OK)
    .json(output);
}

export default ReadUserDocumentsController;
