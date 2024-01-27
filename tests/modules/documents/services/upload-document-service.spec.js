import { uid } from 'uid';
import { it, jest } from '@jest/globals';

import DocumentRepositoryMock from '../infra/document-repository.mock.js';
import UploadProviderMock from '../../../shared/providers/upload-provider.mock.js';
import UploadDocumentService from '../../../../src/modules/documents/services/upload-document-service.js';

describe('upload-document-service.spec', () => {
  let input;
  let repository;
  let uploadProvider;

  beforeAll(() => {
    const url = 'http://url.com';
    const fileName = 'filename.json';
    const user = { id: uid(16) };
    const file = {
      size: 800,
      mimetype: 'json',
    };

    input = { user, file };

    uploadProvider = UploadProviderMock({
      upload: jest.fn()
        .mockResolvedValue(fileName),
      getUrl: jest.fn()
        .mockResolvedValue(url),
    });

    repository = DocumentRepositoryMock();
  });

  it('should be call save and return id and url', async () => {
    const result = await UploadDocumentService(repository, uploadProvider, input);

    expect(result.id).toBeDefined();
    expect(result.url).toBeDefined();
  });

  it('should be fail if upload fails', async () => {
    jest
      .spyOn(uploadProvider, 'upload')
      .mockRejectedValueOnce(new Error());

    const exec = async () => UploadDocumentService(repository, uploadProvider, input);
    await expect(exec).rejects.toThrow();
  });

  it('should be fail if upload fails', async () => {
    jest
      .spyOn(uploadProvider, 'getUrl')
      .mockRejectedValueOnce(new Error());

    const exec = async () => UploadDocumentService(repository, uploadProvider, input);
    await expect(exec).rejects.toThrow();
  });
});
