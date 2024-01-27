import StatusCode from '../../../../shared/utils/status-code.js';
import DocumentRepository from '../database/document-repository.js';
import UploadProvider from '../../../../shared/providers/upload-provider.js';
import UploadDocumentService from '../../services/upload-document-service.js';
import NotificationProvider from '../../../../shared/providers/notification-provider.js';

async function ReadUserDocumentsController(request, response) {
  const { user, file } = request;

  const repository = DocumentRepository();
  const uploadProvider = UploadProvider();
  const notificationProvider = NotificationProvider();
  const input = { user, file };

  const output = await UploadDocumentService(
    repository,
    uploadProvider,
    notificationProvider,
    input,
  );

  return response
    .status(StatusCode.CREATED)
    .json(output);
}

export default ReadUserDocumentsController;
