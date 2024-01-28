import StatusCode from '../../../../shared/utils/status-code.js';
import DocumentRepository from '../database/document-repository.js';
import GivenUsersDocumentsAccessService from '../../services/given-users-documents-access-service.js';
import NotificationProvider from '../../../../shared/providers/notification-provider.js';
import UserRepository from '../../../users/infra/database/user-repository.js';

async function GivenUsersDocumentsAccessController(request, response) {
  const { user } = request;
  const { userIds, documentIds } = request.body;

  const userRepository = UserRepository();
  const documentRepository = DocumentRepository();
  const notificationProvider = NotificationProvider();
  const input = { creator: user, userIds, documentIds };

  const output = await GivenUsersDocumentsAccessService(
    documentRepository,
    userRepository,
    notificationProvider,
    input,
  );

  return response
    .status(StatusCode.NO_CONTENT)
    .json(output);
}

export default GivenUsersDocumentsAccessController;
