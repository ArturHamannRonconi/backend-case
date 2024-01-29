import StatusCode from '../../../../shared/utils/status-code.js';
import DocumentRepository from '../database/document-repository.js';
import UploadProvider from '../../../../shared/providers/upload-provider.js';
import UpdateDocumentService from '../../services/update-document-service.js';
import NotificationProvider from '../../../../shared/providers/notification-provider.js';

async function UpdateDocumentController(request, response) {
  const { user, file } = request;
  const { documentId } = request.params;

  const repository = DocumentRepository();
  const uploadProvider = UploadProvider();
  const notificationProvider = NotificationProvider();
  const input = { user, file, documentId };

  const output = await UpdateDocumentService(
    repository,
    uploadProvider,
    notificationProvider,
    input,
  );

  return response
    .status(StatusCode.OK)
    .json(output);
}

export default UpdateDocumentController;
