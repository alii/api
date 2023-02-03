import {envsafe, str} from 'envsafe';

export const env = envsafe({
	/**
	 * The token used to authenticate requests to the stats endpoint.
	 */
	INGEST_TOKEN: str(),

	/**
	 * The token used to authenticate requests to Lanyard as alistair#9999
	 */
	LANYARD_TOKEN: str(),

	/**
	 * My Discord ID
	 */
	DISCORD_ID: str({
		default: '268798547439255572',
	}),
});
