import mongoose from 'mongoose';

import { uid } from 'uid';
import { expect, it, jest } from '@jest/globals';

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
    const VersionId = uid(32);
    const file = {
      size: 800,
      mimetype: 'json',
    };

    document = CreateDocumentEntity({
      url,
      user,
      file,
      fileName,
      VersionId,
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

    const VersionId1 = uid(32);
    const VersionId2 = uid(32);
    const VersionId3 = uid(32);

    const documents = [
      CreateDocumentEntity({
        url,
        user,
        file,
        fileName,
        VersionId1,
      }),
      CreateDocumentEntity({
        url,
        user,
        file,
        fileName,
        VersionId2,
      }),
      CreateDocumentEntity({
        url,
        user,
        file,
        fileName,
        VersionId3,
      }),
    ];

    const documentIds = documents.map((doc) => doc.id);
    const documentsFromDb = await repository.findManyByIds(documentIds);
    expect(documentsFromDb).toBeDefined();
  });

  it('should be find by id', async () => {
    await repository.save(document);

    const documentFromDb = await repository.findById(document.id);
    expect(documentFromDb.id).toEqual(document.id);
    expect(documentFromDb.name).toEqual(document.name);
  });
});
