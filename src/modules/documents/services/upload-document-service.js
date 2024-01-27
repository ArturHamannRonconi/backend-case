import CreateDocumentEntity from '../domain/create-document-entity.js';

async function UploadDocumentService(repository, uploadProvider, input) {
  const { user, file } = input;

  const fileName = await uploadProvider.upload(file);
  const url = await uploadProvider.getUrl(fileName);

  const document = CreateDocumentEntity({
    user, file, fileName, url,
  });

  await repository.save(document);

  return {
    id: document.id,
    url,
  };
}

export default UploadDocumentService;
