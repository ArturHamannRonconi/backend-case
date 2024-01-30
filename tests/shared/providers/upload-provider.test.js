import { expect } from '@jest/globals';
import UploadProvider from '../../../src/shared/providers/upload-provider.js';

describe('upload-provider.test', () => {
  let key;
  let provider;
  let deleteMarker;

  beforeAll(() => {
    provider = UploadProvider();
  });

  it('should be upload', async () => {
    const document = {
      originalname: 'file',
      buffer: Buffer.from('file'),
    };
    const { Key, VersionId } = await provider.upload(document);
    key = Key;

    expect(Key).toBeDefined();
    expect(VersionId).toBeDefined();
  });

  it('should be get url', async () => {
    const url = await provider.getUrl(key);
    expect(url).toBeDefined();
  });

  it('should be update a document', async () => {
    const VersionId = await provider.update(key, Buffer.from('file-2'));
    expect(VersionId).toBeDefined();
  });

  it('should be soft delete a document', async () => {
    deleteMarker = await provider.softDelete(key);
    expect(deleteMarker).toBeDefined();
  });

  it('should be restore document with sccess', async () => {
    const result = await provider.restoreDocument({
      name: key,
      deleteMarker,
    });

    expect(result).toBeUndefined();
  });
});
