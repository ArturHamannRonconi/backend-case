import LegalType from '../../../src/shared/utils/legal-type.js';

describe('legal-type.spec', () => {
  it('should WILL be create will', () => {
    expect(LegalType.WILL).toEqual('will');
  });

  it('should BYLAW be delete bylaw', () => {
    expect(LegalType.BYLAW).toEqual('bylaw');
  });

  it('should MINUTE be delete minute', () => {
    expect(LegalType.MINUTE).toEqual('minute');
  });

  it('should CONTRACT be create contract', () => {
    expect(LegalType.CONTRACT).toEqual('contract');
  });

  it('should SCRIPTURE be delete scripture', () => {
    expect(LegalType.SCRIPTURE).toEqual('scripture');
  });

  it('should REGULATION be delete regulation', () => {
    expect(LegalType.REGULATION).toEqual('regulation');
  });

  it('should POWER_OF_ATTORNEY be create power-of-attorney', () => {
    expect(LegalType.POWER_OF_ATTORNEY).toEqual('power-of-attorney');
  });

  it('should ARTICLE_OF_ASSOCIATION be delete article-of-association', () => {
    expect(LegalType.ARTICLE_OF_ASSOCIATION).toEqual('article-of-association');
  });

  it('should PETITIONS_AND_PROCEDURAL_DOCUMENT be delete petitions-and-procedural-documents', () => {
    expect(LegalType.PETITIONS_AND_PROCEDURAL_DOCUMENT).toEqual('petitions-and-procedural-documents');
  });
});
