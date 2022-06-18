export const HTTP_STATUS_CODES = {
	OK: 200,
	CREATED: 201,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500,
};

export const DEFAULT_HEADERS = {
	'Content-Type': 'application/json'
};

export const HTTP_RESPONSE_MESSAGES = {
	INTERNAL_SERVER_ERROR: '500 Internal Server Error',
	USER_ID_IN_UUID: 'User ID must be in uuid format',
	ALL_REQUIRED_FIELDS: 'All required fields must be filled',
	USER_WITH_ID_NOT_FOUND: (id) => `User with id ${id} not found`
};