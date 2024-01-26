import { model, Schema } from 'mongoose';

const UserModel = model('UserModel', new Schema({
  id: String,
  email: String,
  password: String,
  permissions: {
    users: [String],
    documents: [String],
  },
}, { collection: 'users' }));

export default UserModel;
