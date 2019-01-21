import fetch from './fetch';

export const list = () => fetch.get('transactions');

export const get = id => fetch.get(`transactions/${id}`);
