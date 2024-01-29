import { expect, jest } from '@jest/globals';

import { uid } from 'uid';
import DocumentRepositoryMock from '../infra/document-repository.mock.js';
import UserRepositoryMock from '../../users/infra/user-repository.mock.js';
import CreateUserEntity from '../../../../src/modules/users/domain/create-user-entity.js';
import NotificationProviderMock from '../../../shared/providers/notification-provider.mock.js';
import CreateDocumentEntity from '../../../../src/modules/documents/domain/create-document-entity.js';
import GivenUsersDocumentsAccessService from '../../../../src/modules/documents/services/given-users-documents-access-service.js';

describe('given-users-documents-access-service.spec', () => {
  let input;
  let userRepository;
  let notificationProvider;
  let documentRepository;

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
    const VersionId = uid(32);

    const document = CreateDocumentEntity({
      url,
      user,
      file,
      fileName,
      VersionId,
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

    await GivenUsersDocumentsAccessService(
      userRepository,
      documentRepository,
      notificationProvider,
      input,
    );

    expect(spySave).toHaveBeenCalledTimes(3);
  });

  it('should be fail if user is not creator', async () => {
    input.creator.id = '321';
    const exec = async () => GivenUsersDocumentsAccessService(
      userRepository,
      documentRepository,
      notificationProvider,
      input,
    );

    await expect(exec).rejects.toThrow();
  });
});
