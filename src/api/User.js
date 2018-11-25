import axios from 'axios';

export const login = data => axios.post('http://localhost:3000/api/v1/login', data);

export const signup = data => axios.post('http://localhost:3000/api/v1/signup', data);
