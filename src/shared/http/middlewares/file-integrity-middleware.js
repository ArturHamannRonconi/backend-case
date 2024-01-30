import crypto from 'crypto';

import FileNotFound from '../errors/file-not-found.js';
import InjuredFileIntegrity from '../errors/injured-file-integrity.js';

function FileIntegrityMiddleware() {
  return (req, _, next) => {
    const { file } = req;
    const fileHeaderHash = req.header('fileHeaderHash');

    if (!file) throw FileNotFound();

    const hash = crypto.createHash('sha256');
    hash.update(file.buffer);

    const fileHash = hash.digest('hex');

    const fileIsIntact = fileHeaderHash && fileHeaderHash === fileHash;
    if (!fileIsIntact) throw InjuredFileIntegrity();

    next();
  };
}

export default FileIntegrityMiddleware;
