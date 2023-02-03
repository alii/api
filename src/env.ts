import {envsafe, str} from 'envsafe';

export const env = envsafe({
	INGEST_API_KEY: str(),
	LANYARD_TOKEN: str(),
	DISCORD_ID: str({
		default: '268798547439255572',
	}),
});
