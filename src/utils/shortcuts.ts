import {z} from 'zod';
import {pika} from './pika.ts';

type ToNumber<T> = T extends `${infer X extends number}` ? X : never;
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type AnyMinutes = `${0 | 1 | 2 | 3 | 4 | 5}${Digit}`;
type AnyTimeOfDay = ToNumber<`${0 | 1}${Digit}${AnyMinutes}` | `2${0 | 1 | 2 | 3}${AnyMinutes}`>;

export interface ShortcutState {
	id: string;

	/**
	 * The timestamp the shortcut was invoked at
	 */
	last_invoked_at: number;

	ranges: Array<{
		from_time: AnyTimeOfDay;
		to_time: AnyTimeOfDay;

		/**
		 * Only allow an invocation once per this period (in milliseconds)
		 */
		throttle_period: number;
	}>;
}

const shortcuts = new Map<string, ShortcutState>();

export const rangesSchema = z.array(
	z.object({
		from_time: z.number().min(0).max(2359),
		to_time: z.number().min(0).max(2359),
		throttle_period: z.number(),
	}),
);

export function createShortcut(ranges: ShortcutState['ranges']) {
	const id = pika.gen('shortcut');

	// unlikely but just in case xd
	if (shortcuts.has(id)) {
		return createShortcut(ranges);
	}

	shortcuts.set(id, {
		id,
		ranges,
		last_invoked_at: Date.now(),
	});

	return {id};
}

// Validates that the timing
export function validateShortcutInvocation(id: string): boolean {
	const state = shortcuts.get(id);

	if (!state) {
		throw new Error('Shortcut not found');
	}

	const now = new Date();

	const nowTime = now.getHours() * 100 + now.getMinutes();

	const range = state.ranges.find(range => nowTime >= range.from_time && nowTime <= range.to_time);

	if (!range) {
		return false;
	}

	const lastInvocation = state.last_invoked_at;

	const isThrottled = now.getTime() - lastInvocation < range.throttle_period;

	if (isThrottled) {
		return false;
	}

	state.last_invoked_at = now.getTime();

	return true;
}
