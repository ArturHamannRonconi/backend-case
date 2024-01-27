import mongoose from 'mongoose';

import { uid } from 'uid';
import { jest } from '@jest/globals';

import '../../../../src/shared/config/database-connection.js';
import LegalType from '../../../../src/shared/utils/legal-type.js';
import DocumentModel from '../../../../src/modules/documents/infra/database/document-model.js';
import CreateDocumentEntity from '../../../../src/modules/documents/domain/create-document-entity.js';
import DocumentRepository from '../../../../src/modules/documents/infra/database/document-repository.js';

describe('document-repository.test', () => {
  let document;
  let repository;

  beforeAll(() => {
    repository = DocumentRepository();
  });

  beforeEach(async () => {
    const user = { id: uid(16) };
    const url = 'http://url.com';
    const fileName = 'filename.json';
    const file = {
      size: 800,
      mimetype: 'json',
    };

    document = CreateDocumentEntity({
      user, url, fileName, file,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should be create an new user', async () => {
    const spyCreate = jest.spyOn(DocumentModel, 'create');

    await repository.save(document);

    expect(spyCreate).toHaveBeenCalled();
  });

  it('should be replace one user', async () => {
    const spyReplaceOne = jest.spyOn(DocumentModel, 'replaceOne');

    await repository.save(document);

    document.legalType = LegalType.CONTRACT;
    await repository.save(document);

    expect(spyReplaceOne).toHaveBeenCalled();
  });
});
