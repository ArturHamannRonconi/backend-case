import { jest } from '@jest/globals';

import ErrorMiddleware from '../../../../src/shared/http/middlewares/error-middleware.js';

describe('error-middleware.spec', () => {
  let next;
  let error;
  let request;
  let response;

  beforeAll(() => {
    error = { message: 'any message' };
    request = {};
    response = { status: () => {}, json: () => {} };
    next = jest.fn();
  });

  it('should call status with 400', () => {
    const statusSpy = jest.spyOn(response, 'status');
    ErrorMiddleware(error, request, response, next);
    expect(statusSpy).toHaveBeenCalledWith(400);
  });

  it('should call json with error', () => {
    const jsonSpy = jest.spyOn(response, 'json');
    ErrorMiddleware(error, request, response, next);
    expect(jsonSpy).toHaveBeenCalledWith({ error: error.message });
  });

  it('should call next', () => {
    ErrorMiddleware(error, request, response, next);
    expect(next).toHaveBeenCalled();
  });
});
