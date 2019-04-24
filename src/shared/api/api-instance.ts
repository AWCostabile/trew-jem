import axios from 'axios';
import { Cookies } from 'shared/utils/cookies';
import { v4 } from 'uuid';

export const apiInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000
});

apiInstance.interceptors.request.use(({ headers, ...request }) => ({
  ...request,
  headers: {
    Authorization: Cookies.get('auth_token') || '',
    'X-Request-ID': v4(),
    ...headers
  }
}));
