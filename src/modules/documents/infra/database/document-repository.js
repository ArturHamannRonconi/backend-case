import DocumentModel from './document-model.js';

function DocumentRepository() {
  return {
    save: async (document) => {
      const filterId = { id: document.id };
      const exists = await DocumentModel.exists(filterId);

      if (exists) {
        await DocumentModel.replaceOne(filterId, document);
      } else {
        await DocumentModel.create(document);
      }
    },
  };
}

export default DocumentRepository;
