import InvalidToken from '../errors/invalid-token.js';
import ForbiddenAccess from '../errors/forbidden-access.js';
import DefineAuthorization from '../../utils/define-authorization.js';
import UserModel from '../../../modules/users/infra/database/user-model.js';

function AuthorizationMiddleware({ resource, action }) {
  return async (req, _, next) => {
    const { userId } = req;

    const user = await UserModel.findOne({ id: userId });
    if (!user) throw InvalidToken();

    const VerifyAuthorization = DefineAuthorization(user);
    const canAccess = VerifyAuthorization(resource, action);
    if (!canAccess) throw ForbiddenAccess();

    req.user = user;

    next();
  };
}

export default AuthorizationMiddleware;
