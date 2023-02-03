import {router} from '../../router.ts';
import {stats} from './stats.ts';

export const v1 = router().merge('/stats', stats);
