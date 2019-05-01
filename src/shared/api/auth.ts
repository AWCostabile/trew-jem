import { IAuthProps } from 'shared/types/auth';
import { apiInstance } from './api-instance';

export const login = (auth: IAuthProps) =>
  apiInstance.post('/login', auth).then(res => res.data);
