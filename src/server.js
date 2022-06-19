import { createServer } from 'http';

import Router from './routes/user.routes.js';

import { DEFAULT_HEADERS } from './utils/constants.js';
import { HTTP_RESPONSE_MESSAGES } from './utils/constants.js';
import { HTTP_STATUS_CODES } from './utils/constants.js';

const server = createServer((req, res) => {
	try {
		Router.handle(req, res);

	} catch (err) {
		res.writeHead(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, DEFAULT_HEADERS );
		res.end(JSON.stringify({ 'message': HTTP_RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR }));
	}
});

export default server;