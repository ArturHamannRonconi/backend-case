async function ReadUserProfileService(input) {
  const { user } = input;

  return {
    id: user.id,
    email: user.email,
    permissions: user.permissions,
  };
}

export default ReadUserProfileService;
