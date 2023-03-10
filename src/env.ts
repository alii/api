import {z} from 'zod';

export function zenv<S extends z.ZodRawShape>(schema: S, env = process.env) {
	return z.object(schema).parse(env);
}

export const env = zenv({
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
	DISCORD_ID: z.string().default('268798547439255572'),

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
