import { expect, jest } from '@jest/globals';

import DocumentRepositoryMock from '../infra/document-repository.mock.js';
import UserRepositoryMock from '../../users/infra/user-repository.mock.js';
import CreateUserEntity from '../../../../src/modules/users/domain/create-user-entity.js';
import NotificationProviderMock from '../../../shared/providers/notification-provider.mock.js';
import CreateDocumentEntity from '../../../../src/modules/documents/domain/create-document-entity.js';
import RemoveUsersDocumentsAccessService from '../../../../src/modules/documents/services/remove-users-documents-access-service.js';

describe('remove-users-documents-access-service.spec', () => {
  let input;
  let userRepository;
  let documentRepository;
  let notificationProvider;

  beforeAll(() => {
    const user = CreateUserEntity({
      isAdmin: false,
      email: 'vali@mail.com',
      password: 'CSAdsaqw3#@!',
    });

    const url = 'http://url.com';
    const fileName = 'filename.json';
    const file = {
      size: 800,
      mimetype: 'json',
    };

    const document = CreateDocumentEntity({
      user, url, fileName, file,
    });

    input = {
      creator: user,
      userIds: ['1', '2', '3'],
      documentIds: ['1', '2', '3'],
    };

    userRepository = UserRepositoryMock({
      findManyByIds: jest.fn()
        .mockResolvedValue([user]),
    });
    notificationProvider = NotificationProviderMock();

    documentRepository = DocumentRepositoryMock({
      findManyByIds: jest.fn()
        .mockResolvedValue([
          document,
          document,
          document,
        ]),
    });
  });

  it('should be call save 2 times', async () => {
    const spySave = jest.spyOn(documentRepository, 'save');

    await RemoveUsersDocumentsAccessService(
      userRepository,
      documentRepository,
      notificationProvider,
      input,
    );

    expect(spySave).toHaveBeenCalledTimes(3);
  });

  it('should be fail if user is not creator', async () => {
    input.creator.id = '321';
    const exec = async () => RemoveUsersDocumentsAccessService(
      userRepository,
      documentRepository,
      notificationProvider,
      input,
    );

    await expect(exec).rejects.toThrow();
  });
});
