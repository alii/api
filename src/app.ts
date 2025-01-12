import 'dotenv/config.js';

import {createKaitoHandler} from '@kaito-http/core';
import {KaitoServer} from '@kaito-http/uws';
import {ZodError} from 'zod';
import {getContext} from './context.ts';
import {v1} from './routes/v1/v1.ts';

const app = v1.merge('/v1', v1).get('/', async () => 'github.com/alii/api');

const fetch = createKaitoHandler({
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

const server = await KaitoServer.serve({
	port: 3000,
	fetch,
});

console.log('Ready', server.url);
