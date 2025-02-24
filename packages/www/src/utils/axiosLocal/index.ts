import axios from 'axios';

export const BASE_LOCAL_URL = process.env.REACT_APP_BASE_LOCAL_URL;
export const axiosLocal = axios.create({
  baseURL: BASE_LOCAL_URL,
});
