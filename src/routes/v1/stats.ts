import {z} from 'zod';
import {router} from '../../router.ts';
import {KaitoError} from '@kaito-http/core';
import {env} from '../../env.ts';

export const stats = router().add('POST', '/', {
	body: z.object({location: z.string()}).partial(),
	run: async ({ctx, body}) => {
		const auth = ctx.req.headers.authorization;

		if (auth !== env.INGEST_API_KEY) {
			throw new KaitoError(401, 'Forbidden');
		}

		if (body.location !== undefined) {
			await ctx.lanyard.update('location', body.location);
		}

		ctx.res.status(204);
	},
});
