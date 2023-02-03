import {createGetContext, type InferContext} from '@kaito-http/core';
import {LanyardClient} from './utils/clients/lanyard';
import {env} from './env';

export const getContext = createGetContext(async (req, res) => {
	return {
		req,
		res,

		lanyard: new LanyardClient({
			snowflake: env.DISCORD_ID,
			token: env.LANYARD_TOKEN,
		}),
	};
});

export type Context = InferContext<typeof getContext>;
