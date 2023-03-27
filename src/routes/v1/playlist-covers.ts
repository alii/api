import {z} from 'zod';
import {router} from '../../router';
import Jimp from 'jimp';
import {env} from '../../env';
import {join} from 'node:path';

const fontsDir = join(env.ROOT_PROJECT_DIR, 'fonts');
const avenirPath = join(fontsDir, 'avenir.fnt');

const avenir = await Jimp.loadFont(avenirPath);

const SQUARE_SIDE = 1080;

export const playlistCovers = router().add('GET', '/', {
	query: {
		title: z.string().max(15),
		image: z.string().url(),
	},
	run: async ({query, ctx}) => {
		const image = await Jimp.read(query.image);

		const buffer = await image
			.resize(SQUARE_SIDE, SQUARE_SIDE)
			.quality(100)
			.print(
				avenir,
				0,
				0,
				{
					text: query.title,
					alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
					alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
				},
				SQUARE_SIDE,
				SQUARE_SIDE,
			)
			.getBufferAsync('image/png');

		ctx.res.header('Content-Type', 'image/png');

		ctx.res.raw.end(buffer);
	},
});
