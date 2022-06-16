export default parseBodyData = async (req) => {
	return new Promise((resolve, reject) => {
		try {
			let data = '';

			req.on('data', (chunk) => {
				data += chunk.toString();
			});

			req.on('end', () => {
				resolve(JSON.parse(data));
			});
		} catch (err) {
			reject(err);
		}
	});
};