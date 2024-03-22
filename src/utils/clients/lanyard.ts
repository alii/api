import {API, LanyardHTTPError, type Types} from '@prequist/lanyard';
import urlcat from 'es-urlcat';
import {env} from '../../env';

export interface LanyardClientOptions {
	token: string;
	snowflake: string;
	base?: string;
}

export class LanyardClient {
	private options: Required<LanyardClientOptions>;

	constructor(options: LanyardClientOptions) {
		this.options = {
			base: 'https://api.lanyard.rest',
			...options,
		};
	}

	async update(key: string, value: string) {
		const url = urlcat(this.options.base, '/v1/users/:user_id/kv/:key', {
			user_id: this.options.snowflake,
			key,
		});

		const request = new Request(url, {
			method: 'PUT',
			body: value,
		});

		await this.request(request);
	}

	async get(id: string = env.DISCORD_ID) {
		const url = urlcat(this.options.base, '/v1/users/:user_id', {
			user_id: id,
		});

		const request = new Request(url);

		const response = await this.request(request);

		const body = (await response.json()) as API.EitherAPIResponse<Types.Presence>;

		if (API.isErrored(response, body)) {
			throw new LanyardHTTPError(request, response, body);
		}

		return body.data;
	}

	private async request(request: Request) {
		request.headers.set('Authorization', this.options.token);

		const response = await fetch(request);

		if (!response.ok) {
			throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
		}

		return response;
	}
}
