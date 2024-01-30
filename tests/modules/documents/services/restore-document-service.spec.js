import { uid } from 'uid';

import { expect, jest } from '@jest/globals';
import CreateUserEntity from '../../../../src/modules/users/domain/create-user-entity.js';
import CreateDocumentEntity from '../../../../src/modules/documents/domain/create-document-entity.js';
import NotificationProviderMock from '../../../shared/providers/notification-provider.mock.js';
import UploadProviderMock from '../../../shared/providers/upload-provider.mock.js';
import DocumentRepositoryMock from '../infra/document-repository.mock.js';
import RestoreDocumentService from '../../../../src/modules/documents/services/restore-document-service.js';

describe('restore-document-service.spec', () => {
  let input;
  let repository;
  let uploadProvider;
  let notificationProvider;

  const user = CreateUserEntity({
    isAdmin: true,
    email: 'valid@mail.com',
    password: 'abcAS312#@!',
  });

  const url = 'http://url.com';
  const fileName = 'filename.json';
  const VersionId = uid(32);
  const file = {
    size: 800,
    mimetype: 'json',
  };

  const document = CreateDocumentEntity({
    user, url, fileName, file, VersionId,
  });

  beforeAll(() => {
    input = { documentId: document.id, user };

    repository = DocumentRepositoryMock({
      findById: jest.fn()
        .mockResolvedValue(document),
    });

    uploadProvider = UploadProviderMock();
    notificationProvider = NotificationProviderMock();
  });

  it('should be success', async () => {
    await RestoreDocumentService(repository, uploadProvider, notificationProvider, input);
  });

  it('should be fail if is invalid params', async () => {
    input.documentId = 213;

    const exec = async () => RestoreDocumentService(
      repository,
      uploadProvider,
      notificationProvider,
      input,
    );

    await expect(exec).rejects.toThrow();
    input.documentId = document.id;
  });

  it('should be fail if user is not creator', async () => {
    document.creatorId = 'any another';

    const exec = async () => RestoreDocumentService(
      repository,
      uploadProvider,
      notificationProvider,
      input,
    );

    await expect(exec).rejects.toThrow();
    document.creatorId = user.id;
  });
});
