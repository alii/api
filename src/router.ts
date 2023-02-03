import {Router} from '@kaito-http/core';
import type {Context} from './context.ts';

export function router() {
	return Router.create<Context>();
}
