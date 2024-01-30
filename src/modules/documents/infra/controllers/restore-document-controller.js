import StatusCode from '../../../../shared/utils/status-code.js';
import DocumentRepository from '../database/document-repository.js';
import UploadProvider from '../../../../shared/providers/upload-provider.js';
import RestoreDocumentService from '../../services/restore-document-service.js';
import NotificationProvider from '../../../../shared/providers/notification-provider.js';

async function RestoreDocumentController(request, response) {
  const { user } = request;
  const { documentId } = request.body;

  const repository = DocumentRepository();
  const uploadProvider = UploadProvider();
  const notificationProvider = NotificationProvider();
  const input = { documentId, user };

  const output = await RestoreDocumentService(
    repository,
    uploadProvider,
    notificationProvider,
    input,
  );

  return response
    .status(StatusCode.NO_CONTENT)
    .json(output);
}

export default RestoreDocumentController;
