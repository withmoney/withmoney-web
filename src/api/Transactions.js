import fetch from './fetch';
import { mountQuery } from '../utils/parse';

export const list = (query = {}) => fetch.get(mountQuery('transactions', query));

export const get = id => fetch.get(`transactions/${id}`);

export const put = (id, data) => fetch.put(`transactions/${id}`, data);
