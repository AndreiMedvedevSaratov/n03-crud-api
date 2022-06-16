// Entry point here

import { listen } from './server.js';

require('dotenv').config();

const PORT = process.env.PORT || 3000;

listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});