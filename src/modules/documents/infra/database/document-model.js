import { model, Schema } from 'mongoose';

const DocumentModel = model('DocumentModel', new Schema({
  id: String,
  url: String,
  size: Number,
  name: String,
  originalName: String,
  createdAt: Date,
  mimeType: String,
  legalType: String,
  creatorId: String,
  currentVersionId: String,
  nonCurrentVersionIds: [String],
  userIdsCanAccess: [String],
  changeLogs: [{
    id: String,
    action: String,
    userId: String,
    description: String,
    updatedAt: Date,
  }],
}, { collection: 'documents' }));

export default DocumentModel;
