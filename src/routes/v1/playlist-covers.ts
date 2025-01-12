import {HorizontalAlign, Jimp, loadFont, VerticalAlign} from 'jimp';
import {join} from 'node:path';
import {z} from 'zod';
import {router} from '../../context.ts';
import {env} from '../../env.ts';

const fontsDir = join(env.ROOT_PROJECT_DIR, 'fonts');
const avenirPath = join(fontsDir, 'avenir.fnt');

const avenir = await loadFont(avenirPath);

export const playlistCovers = router().get('/', {
	query: {
		title: z.string().max(20),
		image: z.string().url(),
		size: z.string().transform(Number).pipe(z.number().positive().max(2000).default(1080)),
	},
	run: async ({query}) => {
		const image = await Jimp.read(query.image);

		const buffer = await image
			.resize({w: query.size, h: query.size})
			.print({
				font: avenir,
				x: 0,
				y: 0,
				maxWidth: query.size,
				maxHeight: query.size,
				text: {
					text: query.title,
					alignmentX: HorizontalAlign.CENTER,
					alignmentY: VerticalAlign.MIDDLE,
				},
			})
			.getBuffer('image/png');

		return new Response(buffer, {
			headers: {
				'Content-Type': 'image/png',
			},
		});
	},
});
