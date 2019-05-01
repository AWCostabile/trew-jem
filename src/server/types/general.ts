import { Request } from 'express';

export interface IServerRequest extends Request {
  initialState?: object;
}

export interface IServerResponse {
  data: any;
  isJson?: boolean;
  status: number;
  headers?: object;
}
