import 'dotenv/config.js';

import {createFMWServer} from '@kaito-http/core';
import {ZodError} from 'zod';
import {getContext} from './context.ts';
import {v1} from './routes/v1/v1.ts';

const app = v1.merge('/v1', v1).add('GET', '/', async () => 'github.com/alii/api');

const {server, fmw} = createFMWServer({
	router: app,
	getContext,

	onError: async ({error}) => {
		if (error instanceof ZodError) {
			return {
				status: 400,
				message: error.message,
			};
		}

		return {
			status: 500,
			message: error.message,
		};
	},
});

server.listen(3000, () => {
	console.log('Ready on port 3000');
	console.log(fmw.prettyPrint());
});
