import pkg from 'jsonwebtoken';

import { uid } from 'uid';
import { jest } from '@jest/globals';

import { TOKEN_SECRET } from '../../../../src/shared/config/environment.js';
import AuthenticationMiddleware from '../../../../src/shared/http/middlewares/authentication-middleware.js';

describe('authentication-middleware.spec', () => {
  let next;
  let token;
  let userId;
  let request;
  let response;

  const { sign } = pkg;

  beforeEach(() => {
    userId = uid(16);
    token = sign({ id: userId }, TOKEN_SECRET);

    next = jest.fn();
    request = { header: () => `Bearer ${token}` };
    response = {};
  });

  it('should be success', () => {
    expect(response.userId).toBeUndefined();

    AuthenticationMiddleware(request, response, next);

    expect(next).toHaveBeenCalled();
    expect(request.userId).toEqual(userId);
  });

  it('should be throw if not has authentication header', async () => {
    jest
      .spyOn(request, 'header')
      .mockReturnValueOnce(undefined);

    const exec = async () => AuthenticationMiddleware(request, response, next);

    await expect(exec).rejects.toThrow();
  });

  it('should be throw if not has Bearer token type', async () => {
    jest
      .spyOn(request, 'header')
      .mockReturnValueOnce(token);

    const exec = async () => AuthenticationMiddleware(request, response, next);

    await expect(exec).rejects.toThrow();
  });

  it('should be throw if not has valid token', async () => {
    jest
      .spyOn(request, 'header')
      .mockReturnValueOnce(`Bearer ${sign({}, 'invalid')}`);

    const exec = async () => AuthenticationMiddleware(request, response, next);

    await expect(exec).rejects.toThrow();
  });
});
