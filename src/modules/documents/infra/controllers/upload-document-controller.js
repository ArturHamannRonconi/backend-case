import StatusCode from '../../../../shared/utils/status-code.js';
import DocumentRepository from '../database/document-repository.js';
import UploadProvider from '../../../../shared/providers/upload-provider.js';
import UploadDocumentService from '../../services/upload-document-service.js';

async function UploadDocumentController(request, response) {
  const { user, file } = request;

  const repository = DocumentRepository();
  const uploadProvider = UploadProvider();
  const input = { user, file };

  const output = await UploadDocumentService(repository, uploadProvider, input);

  return response
    .status(StatusCode.CREATED)
    .json(output);
}

export default UploadDocumentController;
