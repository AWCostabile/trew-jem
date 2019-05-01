import { IServerResponse } from './general';

export interface IRequestData<Type> {
  data?: Type;
  headers?: any;
  params?: any;
  query?: any;
}

export type IApiResponse = Promise<Partial<IServerResponse> & { data?: any }>;

export enum RequestType {
  GET = 'get',
  POST = 'post'
}

export interface IApiService<Type = any> {
  handler: (req: IRequestData<Type>) => IApiResponse;
  method: RequestType;
  path: string;
}

type IApiRouteDescriptor<Type = {}> = Pick<
  IApiService<Type>,
  'handler' | 'path'
>;

export interface IApiRoutes {
  [key: string]: Array<IApiRouteDescriptor<any>>;
}
