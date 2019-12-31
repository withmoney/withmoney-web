import fetch from 'api/fetch';
import { mountQuery } from 'app/utils/parse';

export const list = (query = {}) => fetch.get(mountQuery('transactions', query));

export const create = (data = {}) => fetch.post(`transactions`, data);

export const get = id => fetch.get(`transactions/${id}`);

export const put = (id, data) => fetch.put(`transactions/${id}`, data);
