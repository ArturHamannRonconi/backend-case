import { uid } from 'uid';
import { expect } from '@jest/globals';

import UpdateDocument from '../../../../src/modules/documents/domain/update-document.js';
import CreateDocumentEntity from '../../../../src/modules/documents/domain/create-document-entity.js';

describe('update-document.spec', () => {
  it('should be update and return document', () => {
    const user = { id: uid(16) };
    const url1 = 'http://url.com';
    const VersionId1 = uid(32);
    const fileName = 'filename.json';
    const file1 = {
      size: 800,
      mimetype: 'json',
    };

    const document = CreateDocumentEntity({
      user,
      url: url1,
      fileName,
      file: file1,
      VersionId: VersionId1,
    });

    expect(document.currentVersionId).toEqual(VersionId1);
    expect(document.url).toEqual(url1);
    expect(document.size).toEqual(file1.size);
    expect(document.changeLogs).toHaveLength(1);

    const file2 = { size: 12100 };
    const url2 = 'https://url.com';
    const VersionId2 = uid(32);

    UpdateDocument({
      user,
      document,
      url: url2,
      file: file2,
      VersionId: VersionId2,
    });

    expect(document.currentVersionId).toEqual(VersionId2);
    expect(document.url).toEqual(url2);
    expect(document.size).toEqual(file2.size);
    expect(document.changeLogs).toHaveLength(2);
  });
});
