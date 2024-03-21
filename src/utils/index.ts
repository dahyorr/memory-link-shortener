import { customAlphabet, urlAlphabet } from 'nanoid';

export const customIdGenerator = customAlphabet(urlAlphabet, 10);
