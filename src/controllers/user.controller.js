import { findAll, findById, create, update } from '../models/users.model';
import { getBodyData, isUuid } from '../utils/helpers';
import { DEFAULT_HEADERS } from '../utils/constants';
import { HTTP_RESPONSE_MESSAGES } from '../utils/constants';
import { HTTP_STATUS_CODES } from '../utils/constants';

class UserController {

	async getUsers(_, res) {
		try {
			const users = await findAll();

			res.writeHead(HTTP_STATUS_CODES.OK, DEFAULT_HEADERS);
			res.end(JSON.stringify(users));
		} catch (err) {
			res.writeHead(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, DEFAULT_HEADERS);
			res.end(JSON.stringify({ message: HTTP_RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR }));
		}
	}

	async getUser(req, res) {
		try {
			const { id } = req.params;

			if (!isUuid(id)) {
				res.writeHead(HTTP_STATUS_CODES.BAD_REQUEST, DEFAULT_HEADERS);
				res.end(JSON.stringify({ message: HTTP_RESPONSE_MESSAGES.USER_ID_IN_UUID }));
			}

			const user = await findById(id);

			if (!user) {
				res.writeHead(HTTP_STATUS_CODES.NOT_FOUND, DEFAULT_HEADERS);
				res.end(JSON.stringify({ message: HTTP_RESPONSE_MESSAGES.USER_WITH_ID_NOT_FOUND(id) }));
			}

			res.writeHead(HTTP_STATUS_CODES.OK, DEFAULT_HEADERS);
			res.end(JSON.stringify(user));
		} catch (err) {
			res.writeHead(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, DEFAULT_HEADERS);
			res.end(JSON.stringify({ message: HTTP_RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR }));
		}
	}

	async createUser(req, res) {
		try {
			const data = await getBodyData(req);
			const { name, age, hobbies } = JSON.parse(data);
			const allFieldsFilled = [name, age, hobbies]
				.filter(field => !field).length === 0;

			if (!allFieldsFilled) {
				res.writeHead(HTTP_STATUS_CODES.BAD_REQUEST, DEFAULT_HEADERS);
				res.end(JSON.stringify({ message: HTTP_RESPONSE_MESSAGES.ALL_REQUIRED_FIELDS }));
			}

			const user = { name, age, hobbies };
			const newUser = await create(user);
			res.writeHead(HTTP_STATUS_CODES.CREATED, DEFAULT_HEADERS);
			res.end(JSON.stringify(newUser));
		} catch (err) {
			res.writeHead(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, DEFAULT_HEADERS);
			res.end(JSON.stringify({ message: HTTP_RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR }));
		}
	}

	async updateUser(req, res) {
		try {
			const { id } = req.params;

			if (!isUuid(id)) {
				res.writeHead(HTTP_STATUS_CODES.BAD_REQUEST, DEFAULT_HEADERS);
				res.end(JSON.stringify({ message: HTTP_RESPONSE_MESSAGES.USER_ID_IN_UUID }));
			}

			const user = await findById(id);

			if (!user) {
				res.writeHead(HTTP_STATUS_CODES.NOT_FOUND, DEFAULT_HEADERS);
				res.end(JSON.stringify({ message: HTTP_RESPONSE_MESSAGES.USER_WITH_ID_NOT_FOUND(id) }));
			}

			const data = await getBodyData(req);
			let { name, age, hobbies } = JSON.parse(data);

			const userData = {
				name: name || user.name,
				age: age || user.age,
				hobbies: hobbies || user.hobbies,
			};

			const updatedUser = await update(id, userData);

			res.writeHead(HTTP_STATUS_CODES.OK, DEFAULT_HEADERS);
			res.end(JSON.stringify(updatedUser));
		} catch (err) {
			res.writeHead(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, DEFAULT_HEADERS);
			res.end(JSON.stringify({ message: HTTP_RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR }));
		}
	}

	async deleteUser(req, res) {
		try {
			const { id } = req.params;

			if (!isUuid(id)) {
				res.writeHead(HTTP_STATUS_CODES.BAD_REQUEST, DEFAULT_HEADERS);
				res.end(JSON.stringify({ message: HTTP_RESPONSE_MESSAGES.USER_ID_IN_UUID }));
			}

			const user = await findById(id);

			if (!user) {
				res.writeHead(HTTP_STATUS_CODES.NOT_FOUND, DEFAULT_HEADERS);
				res.end(JSON.stringify({ message: HTTP_RESPONSE_MESSAGES.USER_WITH_ID_NOT_FOUND(id) }));
			}

			delete(id);

			res.writeHead(HTTP_STATUS_CODES.NO_CONTENT, DEFAULT_HEADERS);
			res.end();
		} catch (err) {
			res.writeHead(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, DEFAULT_HEADERS);
			res.end(JSON.stringify({ message: HTTP_RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR }));
		}
	}
}

export default new UserController();