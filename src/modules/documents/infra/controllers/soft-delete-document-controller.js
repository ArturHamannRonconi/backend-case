import StatusCode from '../../../../shared/utils/status-code.js';
import DocumentRepository from '../database/document-repository.js';
import UploadProvider from '../../../../shared/providers/upload-provider.js';
import SoftDeleteDocumentService from '../../services/soft-delete-document-service.js';
import NotificationProvider from '../../../../shared/providers/notification-provider.js';

async function SoftDeleteDocumentController(request, response) {
  const { user } = request;
  const { documentId } = request.body;

  const repository = DocumentRepository();
  const uploadProvider = UploadProvider();
  const notificationProvider = NotificationProvider();
  const input = { documentId, user };

  const output = await SoftDeleteDocumentService(
    repository,
    uploadProvider,
    notificationProvider,
    input,
  );

  return response
    .status(StatusCode.NO_CONTENT)
    .json(output);
}

export default SoftDeleteDocumentController;
