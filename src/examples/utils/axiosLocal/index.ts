import axios from 'axios';
import { getOrigin } from '@utils/getOrigin';

export const BASE_URL = getOrigin();

export const axiosLocal = axios.create({
  baseURL: BASE_URL,
});
