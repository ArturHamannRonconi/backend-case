import Permission from '../../../shared/utils/permission.js';
import CreateChangeLogEntity from './create-change-log-entity.js';

function UpdateDocument({
  document, user, file, url,
  VersionId,
}) {
  const changeLog = CreateChangeLogEntity({
    user,
    action: Permission.UPDATE,
    description: 'Re-upload document',
  });

  document.url = url;
  document.nonCurrentVersionIds.push(document.currentVersionId);
  document.currentVersionId = VersionId;
  document.size = file.size;
  document.changeLogs.push(changeLog);

  return document;
}

export default UpdateDocument;
