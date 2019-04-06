import fetch from './fetch';

export const login = data => fetch.post('login', data);

export const signup = data => fetch.post('signup', data);
