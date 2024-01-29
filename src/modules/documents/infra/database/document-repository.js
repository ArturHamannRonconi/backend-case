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

    findManyByIds: async (ids) => {
      const documents = await DocumentModel.find({
        id: { $in: ids },
      }, { __v: false, _id: false });

      return documents;
    },

    findById: async (id) => {
      const document = await DocumentModel
        .findOne({ id }, { __v: false, _id: false });

      return document;
    },

  };
}

export default DocumentRepository;
