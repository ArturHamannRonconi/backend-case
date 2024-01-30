import express from 'express';

import { jest } from '@jest/globals';

import JsonMiddleware from '../../../../src/shared/http/middlewares/json-middleware.js';

describe('json-middleware.spec', () => {
  it('should be call express json', () => {
    const spyJson = jest.spyOn(express, 'json');
    JsonMiddleware();
    expect(spyJson).toHaveBeenCalled();
  });
});
