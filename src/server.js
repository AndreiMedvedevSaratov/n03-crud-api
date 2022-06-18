import { createServer } from 'http';

import { handle } from './routes/user.routes';

const server = createServer((req, res) => {
	try {
		handle(req, res);
	} catch (err) {
		res.writeHead(500, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ 'message': '500 Internal Server Error' }));
	}
});

export default server;