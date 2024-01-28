import mongoose from 'mongoose';

import { uid } from 'uid';
import { expect, jest } from '@jest/globals';

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

  const user = { id: uid(16) };

  beforeEach(async () => {
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

  it('should be find by user creator', async () => {
    const spyFind = jest.spyOn(DocumentModel, 'find');

    const manyUsers = await repository.findByUserAccess(user);
    expect(spyFind).toHaveBeenCalled();
    expect(manyUsers[0]).toBeDefined();
    expect(manyUsers[1]).toBeDefined();
    expect(manyUsers[0].password).toBeUndefined();
    expect(manyUsers[1].password).toBeUndefined();
  });

  it('should be find many by ids', async () => {
    const url = 'http://url.com';
    const fileName = 'filename.json';
    const file = {
      size: 800,
      mimetype: 'json',
    };

    const documents = [
      CreateDocumentEntity({
        user, url, fileName, file,
      }),
      CreateDocumentEntity({
        user, url, fileName, file,
      }),
      CreateDocumentEntity({
        user, url, fileName, file,
      }),
    ];

    const documentIds = documents.map((doc) => doc.id);
    const documentsFromDb = await repository.findManyByIds(documentIds);
    expect(documentsFromDb).toBeDefined();
  });
});
