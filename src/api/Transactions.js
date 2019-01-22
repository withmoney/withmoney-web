import fetch from './fetch';
import { mountQuery } from '../utils/parse';

export const list = (query = {}) => fetch.get(mountQuery('transactions', query));

export const get = id => fetch.get(`transactions/${id}`);
