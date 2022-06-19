import * as dotenv from 'dotenv';
import { createServer } from 'http';
import { resolve } from 'path';
import { cwd } from 'process';
import {
	createUser,
	deleteUser,
	getUser,
	getUsers,
	updateUser,
} from './controllers/user';
import { forwardJson, testUuid } from './utils/helpers';

dotenv.config({ path: resolve(cwd(), '.env') });

export const server = createServer((req, res) => {
	try {
		if (!req.url) return;

		if (req.url === '/api/users') {
			if (req.method === 'GET') return getUsers(req, res);
			if (req.method === 'POST') return createUser(req, res);
		}

		if (/^\/api\/users\/[\w-]+$/.test(req.url)) {
			const id = req.url.split('/')[3];

			if (!testUuid(id)) return forwardJson(400, { message: 'Invalid id' }, res);

			if (req.method === 'GET') return getUser(req, res, id);
			if (req.method === 'PUT') return updateUser(req, res, id);
			if (req.method === 'DELETE') return deleteUser(req, res, id);
		}

		forwardJson(404, { message: 'Not found' }, res);

	} catch (error) {
		forwardJson(500, { message: 'Oops, something went wrong.', }, res);
	}
})

const port = process.env.PORT || 4000;

server.listen(port).on('listening', () => {
	console.log(`HTTP is listening on ${port}`);
})