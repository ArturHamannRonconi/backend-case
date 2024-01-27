import { model, Schema } from 'mongoose';

const DocumentModel = model('DocumentModel', new Schema({
  id: String,
  size: Number,
  createdAt: Date,
  fileName: String,
  mimeType: String,
  legalType: String,
  creatorId: String,
  urlDocument: String,
  userIdsCanAccess: [String],
  changeLogs: [{
    id: String,
    action: String,
    userId: String,
    updatedAt: Date,
  }],
}, { collection: 'documents' }));

export default DocumentModel;
