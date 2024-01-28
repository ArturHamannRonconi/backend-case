async function ReadUserDocumentsService(repository, input) {
  const { user } = input;

  const documents = await repository.findByUserAccess(user);

  return { documents };
}

export default ReadUserDocumentsService;
