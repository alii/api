import {createGetContext, type InferContext} from '@kaito-http/core';
import {env} from './env.ts';
import {LanyardClient} from './utils/clients/lanyard.ts';

const start = Date.now();

export const getContext = createGetContext(async (req, res) => {
	return {
		req,
		res,

		/**
		 * The current uptime in ms
		 */
		get uptime() {
			return Date.now() - start;
		},

		lanyard: new LanyardClient({
			snowflake: env.DISCORD_ID,
			token: env.LANYARD_TOKEN,
		}),
	};
});

export type Context = InferContext<typeof getContext>;
