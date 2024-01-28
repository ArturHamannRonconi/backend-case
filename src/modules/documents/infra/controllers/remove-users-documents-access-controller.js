import StatusCode from '../../../../shared/utils/status-code.js';
import DocumentRepository from '../database/document-repository.js';
import NotificationProvider from '../../../../shared/providers/notification-provider.js';
import RemoveUsersDocumentsAccessService from '../../services/remove-users-documents-access-service.js';
import UserRepository from '../../../users/infra/database/user-repository.js';

async function RemoveUsersDocumentsAccessController(request, response) {
  const { user } = request;
  const { userIds, documentIds } = request.body;

  const userRepository = UserRepository();
  const documentRepository = DocumentRepository();
  const notificationProvider = NotificationProvider();
  const input = { creator: user, userIds, documentIds };

  const output = await RemoveUsersDocumentsAccessService(
    documentRepository,
    userRepository,
    notificationProvider,
    input,
  );

  return response
    .status(StatusCode.NO_CONTENT)
    .json(output);
}

export default RemoveUsersDocumentsAccessController;
