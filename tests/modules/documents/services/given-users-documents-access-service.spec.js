import { expect, jest } from '@jest/globals';

import DocumentRepositoryMock from '../infra/document-repository.mock.js';
import CreateUserEntity from '../../../../src/modules/users/domain/create-user-entity.js';
import CreateDocumentEntity from '../../../../src/modules/documents/domain/create-document-entity.js';
import GivenUsersDocumentsAccessService from '../../../../src/modules/documents/services/given-users-documents-access-service.js';

describe('given-users-documents-access-service.spec', () => {
  let input;
  let repository;

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

    repository = DocumentRepositoryMock({
      findManyByIds: jest.fn()
        .mockResolvedValue([
          document,
          document,
          document,
        ]),
    });
  });

  it('should be call save 2 times', async () => {
    const spySave = jest.spyOn(repository, 'save');

    await GivenUsersDocumentsAccessService(repository, input);

    expect(spySave).toHaveBeenCalledTimes(3);
  });

  it('should be fail if user is not creator', async () => {
    input.creator.id = '321';
    const exec = async () => GivenUsersDocumentsAccessService(repository, input);

    await expect(exec).rejects.toThrow();
  });
});
