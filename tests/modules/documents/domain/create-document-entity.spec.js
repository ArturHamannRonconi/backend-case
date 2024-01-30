import { uid } from 'uid';

import CreateDocumentEntity from '../../../../src/modules/documents/domain/create-document-entity.js';

describe('create-document-entity.spec', () => {
  it('should be create document', () => {
    const user = { id: uid(16) };
    const url = 'http://url.com';
    const fileName = 'filename.json';
    const VersionId = uid(32);
    const file = {
      size: 800,
      mimetype: 'json',
    };

    const document = CreateDocumentEntity({
      user, url, fileName, file, VersionId,
    });

    expect(document.id).toBeDefined();
    expect(document.url).toBeDefined();
    expect(document.size).toBeDefined();
    expect(document.name).toBeDefined();
    expect(document.mimeType).toBeDefined();
    expect(document.createdAt).toBeDefined();
    expect(document.creatorId).toEqual(user.id);
    expect(document.changeLogs).toBeDefined();
    expect(document.userIdsCanAccess).toBeDefined();

    expect(document.changeLogs).toHaveLength(1);
    expect(document.userIdsCanAccess).toHaveLength(0);
    expect(document.changeLogs[0].userId).toEqual(user.id);
  });
});
