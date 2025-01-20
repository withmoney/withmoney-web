import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export { type ClassValue } from 'clsx';

export const classNames = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
