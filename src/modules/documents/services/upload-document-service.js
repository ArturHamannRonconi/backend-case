import Notification from '../../../shared/utils/notification.js';
import CreateDocumentEntity from '../domain/create-document-entity.js';

async function UploadDocumentService(repository, uploadProvider, notificationProvider, input) {
  const { user, file } = input;

  const fileName = await uploadProvider.upload(file);
  const url = await uploadProvider.getUrl(fileName);

  const document = CreateDocumentEntity({
    user, file, fileName, url,
  });

  await repository.save(document);

  await notificationProvider.notify(user, Notification.UPLOAD);

  return {
    id: document.id,
    url,
  };
}

export default UploadDocumentService;
