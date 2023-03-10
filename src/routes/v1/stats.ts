import {KaitoError} from '@kaito-http/core';
import {z} from 'zod';
import {env} from '../../env.ts';
import {router} from '../../router.ts';

export const stats = router().add('POST', '/', {
	body: z.object({location: z.string()}).partial(),
	run: async ({ctx, body}) => {
		const auth = ctx.req.headers.authorization;

		if (auth !== env.INGEST_TOKEN) {
			throw new KaitoError(401, 'Forbidden');
		}

		if (body.location !== undefined) {
			if (env.LOCATION_BLACKLIST.includes(body.location.toLowerCase())) {
				throw new KaitoError(400, 'Location is blacklisted');
			}

			await ctx.lanyard.update('location', body.location);
		}

		ctx.res.status(204);
	},
});
