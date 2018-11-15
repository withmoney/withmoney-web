import axios from 'axios';

/* eslint import/prefer-default-export: "off" */
export const login = data => axios.post('http://localhost:3000/api/v1/login', data);
