import { uid } from 'uid';
import { jest } from '@jest/globals';
import DocumentRepositoryMock from '../infra/document-repository.mock.js';
import UploadProviderMock from '../../../shared/providers/upload-provider.mock.js';
import NotificationProviderMock from '../../../shared/providers/notification-provider.mock.js';
import UpdateDocumentService from '../../../../src/modules/documents/services/update-document-service.js';
import CreateDocumentEntity from '../../../../src/modules/documents/domain/create-document-entity.js';

describe('update-document-service.spec', () => {
  let input;
  let repository;
  let uploadProvider;
  let notificationProvider;

  const newVersionId = uid(32);
  const exec = () => UpdateDocumentService(
    repository,
    uploadProvider,
    notificationProvider,
    input,
  );

  beforeAll(() => {
    const url = 'http://url.com';
    const fileName = 'filename.json';
    const user = { id: uid(16) };
    const file = {
      size: 800,
      mimetype: 'json',
    };

    const document = CreateDocumentEntity({
      url,
      user,
      file,
      fileName,
      VersionId: uid(32),
    });

    input = { user, file, documentId: '1' };

    repository = DocumentRepositoryMock({
      findById: jest.fn()
        .mockResolvedValue(document),
    });

    uploadProvider = UploadProviderMock({
      update: jest.fn()
        .mockResolvedValue(newVersionId),
      getUrl: jest.fn()
        .mockResolvedValue('https://test.com'),
    });

    notificationProvider = NotificationProviderMock();
  });

  it('should be update document with success', async () => {
    const result = await UpdateDocumentService(
      repository,
      uploadProvider,
      notificationProvider,
      input,
    );

    expect(result.url).toEqual('https://test.com');
    expect(result.documentId).toEqual(input.documentId);
  });

  it('should be fail if document-id is invalid', async () => {
    input.documentId = 123;
    await expect(exec).rejects.toThrow();
  });
});
