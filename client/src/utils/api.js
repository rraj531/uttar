import axios from 'axios';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const normalizedBaseUrl = rawBaseUrl
  ? rawBaseUrl.replace(/\/+$/, '')
  : '/api';

const api = axios.create({
  baseURL: normalizedBaseUrl,
});

export const resolveAppShareUrl = () => {
  const publicUrl = import.meta.env.VITE_PUBLIC_APP_URL?.trim();

  if (publicUrl) {
    return publicUrl.replace(/\/+$/, '');
  }

  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  return '';
};

export default api;
