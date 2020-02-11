import axios, { AxiosResponse } from 'axios';

interface LoginBody {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
}

const base = 'http://localhost:3000/api';

const login = (data: LoginBody): Promise<AxiosResponse<LoginResponse>> =>
  axios.post(`${base}/login`, data);

export default {
  login
};
