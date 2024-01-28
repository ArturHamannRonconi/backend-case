import { expect, jest } from '@jest/globals';
import ReadUserDocumentsService from '../../../../src/modules/documents/services/read-user-documents-service.js';
import DocumentRepositoryMock from '../infra/document-repository.mock.js';

describe('read-user-documents-service.spec', () => {
  let input;
  let repository;

  beforeAll(() => {
    input = { user: {} };
    repository = DocumentRepositoryMock({
      findByUserAccess: jest.fn()
        .mockResolvedValue([]),
    });
  });

  it('should be call findByUserAccess and return documents with succes', async () => {
    const spyFindByUserAccess = jest.spyOn(repository, 'findByUserAccess');

    const result = await ReadUserDocumentsService(repository, input);

    expect(result.documents).toHaveLength(0);
    expect(spyFindByUserAccess).toHaveBeenCalledWith(input.user);
  });
});
