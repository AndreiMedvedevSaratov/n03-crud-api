import { v4 as uuidv4 } from 'uuid';

import users, { find, push, findIndex, splice } from '../db/users.json';

class User {
	async findAll() {
		return users;
	}

	async findById(id) {
		const user = find(user => user.id === id);

		return user;
	}

	async create(user) {
		const newUser = { id: uuidv4(), ...user };

		push(newUser);

		return newUser;
	}

	async update(id, userData) {
		const user = find(user => user.id === id);

		user = { ...user, ...userData };

		return user;
	}

	async delete(id) {
		const index = findIndex(user => user.id === id);
		const deletedUser = users[index];

		splice(index, 1);

		return deletedUser;
	}
}

export default new User();