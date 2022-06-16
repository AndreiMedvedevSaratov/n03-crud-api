import { createServer } from 'http';

import { handle } from './utils/router.js';

const server = createServer((req, res) => {
	handle(req, res);
});

export default server;