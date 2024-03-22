import Pika, {type InferPrefixes} from 'pika-id';

export const pika = new Pika(['shortcut']);

export type IdPrefix = InferPrefixes<typeof pika>;
