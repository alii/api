import {KaitoError} from '@kaito-http/core';
import {z} from 'zod';
import {router} from '../../router';
import {rangesSchema} from '../../utils/shortcuts';

export const shortcuts = router()
	.add('POST', '/', {
		body: z.object({
			ranges: rangesSchema,
		}),

		run: async ({ctx, body}) => {
			const {id} = ctx.shortcuts.create(body.ranges);
			return {id};
		},
	})
	.add('POST', '/:id', async ({ctx, params}) => {
		const {id} = params;
		const isValid = ctx.shortcuts.validateInvocation(id);

		if (!isValid) {
			throw new KaitoError(429, 'Rate limited');
		}

		return 'OK';
	});
