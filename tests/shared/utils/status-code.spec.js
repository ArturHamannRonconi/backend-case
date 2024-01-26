import StatusCode from '../../../src/shared/utils/status-code.js';

describe('status-code.spec', () => {
  it('should status CREATED be 201', () => {
    expect(StatusCode.CREATED).toBe(201);
  });
});
