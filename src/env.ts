import type {Types} from '@prequist/lanyard';
import {join} from 'node:path';
import {fileURLToPath} from 'url';
import {z} from 'zod';

export function zenv<S extends z.ZodRawShape>(schema: S, env = process.env) {
	return z.object(schema).parse(env);
}

export const env = zenv({
	ROOT_PROJECT_DIR: z.string().default(() => {
		const envTs = fileURLToPath(import.meta.url);

		return join(envTs, '..', '..');
	}),

	/**
	 * The token used to authenticate requests to the stats endpoint
	 */
	INGEST_TOKEN: z.string(),

	/**
	 * The token used to authenticate requests to Lanyard as alistair#9999
	 */
	LANYARD_TOKEN: z.string(),

	/**
	 * My Discord ID. Used for Lanyard
	 */
	DISCORD_ID: z
		.string()
		.refine((value): value is Types.Snowflake => {
			try {
				BigInt(value);
				return true;
			} catch {
				return false;
			}
		})
		.default('268798547439255572'),

	/**
	 * Blacklisted locations
	 */
	LOCATION_BLACKLIST: z
		.literal('')
		.transform(() => [])
		.or(z.string().transform(str => str.split(',')))
		.default('')
		.pipe(z.string().min(1).array())
		.transform(strings => strings.map(string => string.toLowerCase())),
});
