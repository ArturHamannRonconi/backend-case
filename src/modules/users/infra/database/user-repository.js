import UserModel from './user-model.js';

function UserRepository() {
  return {
    findByEmail: async (email) => {
      const user = await UserModel.findOne({ email });
      if (!user) return null;

      return user;
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
