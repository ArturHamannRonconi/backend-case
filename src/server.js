import 'express-async-errors';

import './shared/config/database-connection.js';
import { PORT } from './shared/config/environment.js';
import server from './app.js';

server.listen(PORT);
