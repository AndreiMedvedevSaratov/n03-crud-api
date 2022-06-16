const HTTP_METHODS = [
	'GET',
	'POST',
	'PUT',
	'DELETE',
];

class Route {
	constructor(pathname, handler) {
		this.pathname = pathname;
		this.handler = handler;
	}
}

class Router {
	constructor() {
		this._routes = {};
		HTTP_METHODS.forEach(method => {
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

	_routeExists(pathname, method) {
		return this._routes[method]
			.filter(route => route.pathname === pathname).length > 0;
	}

	_findRoute(pathname, method) {
		const index = this._routes[method].findIndex(route => {
			if (route.pathname instanceof RegExp) {
				return pathname.match(route.pathname).length > 0;
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
			res.writeHead(404, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: '404 Route not found' }));
		}
	}
};

export default Router;