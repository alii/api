import {createFMWServer} from '@kaito-http/core';
import {v1} from './routes/v1/v1.ts';
import {getContext} from './context.ts';
import {ZodError} from 'zod';

const {server, fmw} = createFMWServer({
	router: v1,
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
