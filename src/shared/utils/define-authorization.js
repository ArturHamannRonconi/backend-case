function DefineAuthorization(user) {
  return (resource, action) => {
    const resourcePermissions = user.permissions[resource];
    return resourcePermissions.includes(action);
  };
}

export default DefineAuthorization;
