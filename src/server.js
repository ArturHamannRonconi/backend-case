import { PORT } from './config/environment.js';

import { app as server } from './app.js';

server.listen(PORT, () => console.log('Server running...'));
