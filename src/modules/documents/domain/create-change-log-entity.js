import { uid } from 'uid';

function CreateChangeLogEntity({ user, action, description }) {
  return {
    id: uid(16),
    action,
    description,
    userId: user.id,
    updatedAt: new Date(),
  };
}

export default CreateChangeLogEntity;
