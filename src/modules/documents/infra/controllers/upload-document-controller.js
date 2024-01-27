import StatusCode from '../../../../shared/utils/status-code.js';
import DocumentRepository from '../database/document-repository.js';
import UploadDocumentService from '../../services/upload-document-service.js';

async function UploadDocumentController(request, response) {
  const { user } = request;
  const documents = request.files;

  const repository = DocumentRepository();
  const input = { user, documents };
  const output = await UploadDocumentService(repository, input);

  return response
    .status(StatusCode.CREATED)
    .json(output);
}

export default UploadDocumentController;
