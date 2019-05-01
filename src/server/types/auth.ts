import { IUser } from 'shared/types/user';

export interface IApiErrorConfig {
  code?: string;
  reason: string;
  status?: number;
}

export interface IApiErrorInstance extends Error {
  code: string;
  isApiError: boolean;
  reason: string;
  status: number;
}

export interface IServerUser extends IUser {
  password: string;
}
