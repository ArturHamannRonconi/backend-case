import { uid } from 'uid';

import Permission from '../../../shared/utils/permission.js';

function CreateDocumentEntity({
  user, file, fileName, url,
}) {
  return {
    url,
    id: uid(16),
    name: fileName,
    size: file.size,
    creatorId: user.id,
    userIdsCanAccess: [],
    createdAt: new Date(),
    mimeType: file.mimetype,
    originalName: file.originalname,
    changeLogs: [{
      id: uid(16),
      userId: user.id,
      description: 'Upload Document',
      action: Permission.CREATE,
      updatedAt: new Date(),
    }],
  };
}

export default CreateDocumentEntity;
