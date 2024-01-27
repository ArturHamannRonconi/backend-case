import { uid } from 'uid';

import Permission from '../../../shared/utils/permission.js';

function CreateDocumentEntity({
  user, file, fileName, url,
}) {
  return {
    url,
    id: uid(16),
    size: file.size,
    creatorId: user.id,
    createdAt: new Date(),
    mimeType: file.mimetype,
    name: fileName,
    userIdsCanAccess: [],
    changeLogs: [{
      id: uid(16),
      userId: user.id,
      action: Permission.CREATE,
      updatedAt: new Date(),
    }],
  };
}

export default CreateDocumentEntity;
