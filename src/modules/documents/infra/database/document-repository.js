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

    findByUserAccess: async (user) => {
      const documents = await DocumentModel.find({
        $or: [
          { creatorId: user.id },
          { userIdsCanAccess: user.id },
        ],
      }, { __v: false, _id: false });

      return documents;
    },
  };
}

export default DocumentRepository;
