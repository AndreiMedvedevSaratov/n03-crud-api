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
		const { url, method } = req;

		const route = this._findRoute(url, method);

		if (route) {
			const { pathname, handler } = route;

			if (pathname instanceof RegExp) {
				const id = url.split('/').pop();

				req.params = { id };

				handler(req, res);
			} else {
				handler(req, res);
			}
		} else {
			res.writeHead(HTTP_STATUS_CODES.NOT_FOUND, DEFAULT_HEADERS);
			res.end(JSON.stringify({ message: HTTP_RESPONSE_MESSAGES.ROUTE_NOT_FOUND }));
		}
	}
};

export default Router;