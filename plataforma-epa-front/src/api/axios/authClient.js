import axios from 'axios';

export const authClient = axios.create({
  baseURL: '/api',
  withCredentials: true, // Manda el refreshToken por cookie.
  headers: {
    'Content-Type': 'application/json',
  },
});
