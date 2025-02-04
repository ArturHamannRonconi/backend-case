import UserModel from './user-model.js';

function UserRepository() {
  return {
    findById: async (id) => {
      const user = await UserModel.findOne({ id }, { __v: false, _id: false });
      if (!user) return null;

      return user;
    },

    findManyByIds: async (ids) => {
      const users = await UserModel.find(
        { id: { $in: ids } },
        { __v: false, _id: false },
      );

      return users;
    },

    findByEmail: async (email) => {
      const user = await UserModel.findOne({ email }, { __v: false, _id: false });
      if (!user) return null;

      return user;
    },

    findAll: async () => {
      const users = await UserModel.find({}, { password: 0, __v: false, _id: false });
      return users;
    },

    save: async (user) => {
      const filterId = { id: user.id };
      const exists = await UserModel.exists(filterId);

      if (exists) {
        await UserModel.replaceOne(filterId, user);
      } else {
        await UserModel.create(user);
      }
    },
  };
}

export default UserRepository;
