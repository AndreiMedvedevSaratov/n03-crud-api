import { validate, version } from 'uuid';
import { ServerResponse } from 'http';

export function testUuid(id: string) {
	return validate(id) && version(id) === 4;
}

export function forwardJson(
	status: number,
	message: unknown,
	res: ServerResponse,
) {
	res.writeHead(status, { 'Content-Type': 'application/json', });
	res.end(JSON.stringify(message));
}
