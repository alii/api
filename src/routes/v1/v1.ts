import {router} from '../../router.ts';
import {playlistCovers} from './playlist-covers.ts';
import {shortcuts} from './shortcuts.ts';
import {stats} from './stats.ts';

export const v1 = router()
	.merge('/stats', stats)
	.merge('/playlist-covers', playlistCovers)
	.merge('/shortcut-limiter', shortcuts);
