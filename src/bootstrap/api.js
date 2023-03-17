import axios from 'axios';
import { BASE_URL } from '../config/Constant';

export const api = axios.create({
  timeout: 10000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json'
  },
  baseURL: BASE_URL
})
