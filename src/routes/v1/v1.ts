import {router} from '../../context.ts';

import {playlistCovers} from './playlist-covers.ts';
import {stats} from './stats.ts';

export const v1 = router().merge('/stats', stats).merge('/playlist-covers', playlistCovers);
