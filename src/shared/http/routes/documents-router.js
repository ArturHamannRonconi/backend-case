import { Router } from 'express';

import Resource from '../../utils/resource.js';
import Permission from '../../utils/permission.js';
import UploadMiddleware from '../middlewares/upload-middleware.js';
import AuthorizationMiddleware from '../middlewares/authorization-middleware.js';
import FileIntegrityMiddleware from '../middlewares/file-integrity-middleware.js';
import AuthenticationMiddleware from '../middlewares/authentication-middleware.js';
import UploadDocumentController from '../../../modules/documents/infra/controllers/upload-document-controller.js';

const documentsRouter = Router();

documentsRouter.post(
  '/',
  AuthenticationMiddleware,
  AuthorizationMiddleware({
    action: Permission.CREATE,
    resource: Resource.DOCUMENTS,
  }),
  UploadMiddleware(),
  FileIntegrityMiddleware(),
  UploadDocumentController,
);

export default documentsRouter;
