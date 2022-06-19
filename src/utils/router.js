import { METHODS } from 'http';

import { DEFAULT_HEADERS } from './constants.js';
import { HTTP_RESPONSE_MESSAGES } from './constants.js';
import { HTTP_STATUS_CODES } from './constants.js';

class Route {
	constructor(pathname, handler) {
		this.pathname = pathname;
		this.handler = handler;
	}
}

class Router {
	constructor() {
		this._routes = {};
		this._HTTP_METHODS = METHODS;
		this._createRouterMethods();
	}

	_createRouterMethods() {
		this._HTTP_METHODS.forEach(method => {
			this._routes[method] = [];
			this[method.toLowerCase()] = (pathname, handler) => {
				if (pathname.includes(':')) {
					const regexpString = pathname.replace(/:(\w+)/g, '(.+)');
					const regexp = new RegExp(regexpString, 'g');
					const route = new Route(regexp, handler);

					this._routes[method].push(route);
				} else {
					const route = new Route(pathname, handler);

					this._routes[method].push(route);
				}
			};
		});
	}

	_findRoute(pathname, method) {
		const index = this._routes[method].findIndex(route => {
			if (route.pathname instanceof RegExp) {
				const matches = pathname.match(route.pathname);

				if (!matches) {
					return false;
				}

				return matches.length > 0;
			} else {
				return route.pathname === pathname;
			}
		});

		if (index === -1) {
			return null;
		} else {
			return this._routes[method][index];
		}
	}

	handle(req, res) {
		try {
			if (!req.url) return

			if (req.url === '/api/users') {
				if (req.method === 'GET') return getUsers(req, res)

				if (req.method === 'POST') return createUser(req, res)
			}

			if (/^\/api\/users\/[\w-]+$/.test(req.url)) {
				const id = req.url.split('/')[3]

				if (!isUUID(id)) return sendJSON(400, { message: 'invalid id' }, res)

				if (req.method === 'GET') return getUser(req, res, id)

				if (req.method === 'PUT') return updateUser(req, res, id)

				if (req.method === 'DELETE') return deleteUser(req, res, id)
			}

			sendJSON(404, { message: 'not found' }, res)
		} catch (error) {
			sendJSON(
				500,
				{
					message: 'Oops, something went wrong. Try to refresh this page.',
				},
				res
			)
		}
	}
};

export default Router;