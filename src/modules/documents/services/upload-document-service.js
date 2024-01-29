import Notification from '../../../shared/utils/notification.js';
import CreateDocumentEntity from '../domain/create-document-entity.js';

async function UploadDocumentService(repository, uploadProvider, notificationProvider, input) {
  const { user, file } = input;

  const { Key: fileName, VersionId } = await uploadProvider.upload(file);
  const url = await uploadProvider.getUrl(fileName);

  const document = CreateDocumentEntity({
    user, file, fileName, url, VersionId,
  });

  await repository.save(document);

  await notificationProvider.notify(user, Notification.UPLOAD);

  return {
    documentId: document.id,
    url,
  };
}

export default UploadDocumentService;
