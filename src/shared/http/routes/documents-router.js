import { Router } from 'express';

import Resource from '../../utils/resource.js';
import Permission from '../../utils/permission.js';
import UploadMiddleware from '../middlewares/upload-middleware.js';
import AuthorizationMiddleware from '../middlewares/authorization-middleware.js';
import FileIntegrityMiddleware from '../middlewares/file-integrity-middleware.js';
import AuthenticationMiddleware from '../middlewares/authentication-middleware.js';
import UploadDocumentController from '../../../modules/documents/infra/controllers/upload-document-controller.js';
import ReadUserDocumentsController from '../../../modules/documents/infra/controllers/read-user-documents-controller.js';
import GivenUsersDocumentsAccessController from '../../../modules/documents/infra/controllers/given-users-documents-access-controller.js';
import RemoveUsersDocumentsAccessController from '../../../modules/documents/infra/controllers/remove-users-documents-access-controller.js';
import UpdateDocumentController from '../../../modules/documents/infra/controllers/update-document-controller.js';
import SoftDeleteDocumentController from '../../../modules/documents/infra/controllers/soft-delete-document-controller.js';
import RestoreDocumentController from '../../../modules/documents/infra/controllers/restore-document-controller.js';

const documentsRouter = Router();

documentsRouter.get(
  '/',
  AuthenticationMiddleware,
  AuthorizationMiddleware({
    action: Permission.READ,
    resource: Resource.DOCUMENTS,
  }),
  ReadUserDocumentsController,
);

documentsRouter.delete(
  '/',
  AuthenticationMiddleware,
  AuthorizationMiddleware({
    action: Permission.DELETE,
    resource: Resource.DOCUMENTS,
  }),
  SoftDeleteDocumentController,
);

documentsRouter
  .patch(
    '/given-users-access',
    AuthenticationMiddleware,
    AuthorizationMiddleware({
      action: Permission.UPDATE,
      resource: Resource.DOCUMENTS,
    }),
    GivenUsersDocumentsAccessController,
  );

documentsRouter
  .patch(
    '/remove-users-access',
    AuthenticationMiddleware,
    AuthorizationMiddleware({
      action: Permission.UPDATE,
      resource: Resource.DOCUMENTS,
    }),
    RemoveUsersDocumentsAccessController,
  );

documentsRouter.put(
  '/:documentId',
  AuthenticationMiddleware,
  AuthorizationMiddleware({
    action: Permission.CREATE,
    resource: Resource.DOCUMENTS,
  }),
  AuthorizationMiddleware({
    action: Permission.UPDATE,
    resource: Resource.DOCUMENTS,
  }),
  UploadMiddleware(),
  FileIntegrityMiddleware(),
  UpdateDocumentController,
);

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

documentsRouter.post(
  '/restore',
  AuthenticationMiddleware,
  AuthorizationMiddleware({
    action: Permission.DELETE,
    resource: Resource.DOCUMENTS,
  }),
  AuthorizationMiddleware({
    action: Permission.UPDATE,
    resource: Resource.DOCUMENTS,
  }),
  RestoreDocumentController,
);

export default documentsRouter;
