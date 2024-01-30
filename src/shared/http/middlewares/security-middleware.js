import helmet from 'helmet';

function SecurityMiddleware() {
  return helmet();
}

export default SecurityMiddleware;
