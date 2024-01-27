import { expect } from '@jest/globals';
import UploadProvider from '../../../src/shared/providers/upload-provider.js';

describe('upload-provider.test', () => {
  let key;
  let provider;

  beforeAll(() => {
    provider = UploadProvider();
  });

  it('should be upload', async () => {
    const document = {
      originalname: 'file',
      buffer: Buffer.from('file'),
    };

    key = await provider.upload(document);
    expect(key).toBeDefined();
  });

  it('should be upload', async () => {
    const url = await provider.getUrl(key);
    expect(url).toBeDefined();
  });
});
