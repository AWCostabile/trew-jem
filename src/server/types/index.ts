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

export type IApiResponse = Promise<Partial<IServerResponse> & { data?: any }>;

export enum RequestType {
  GET = 'get',
  POST = 'post'
}

export interface IApiService {
  handler: (req: Request) => IApiResponse;
  method: RequestType;
  path: string;
}

type IApiRouteDescriptor = Pick<IApiService, 'handler' | 'path'>;

export interface IApiRoutes {
  [key: string]: IApiRouteDescriptor[];
}
