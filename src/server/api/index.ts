import { IApiResponse, IServerRequest } from 'server/types';
import { LoginController } from './controllers/login';
import { ApiServer } from './service';

const apiServer = new ApiServer([...LoginController]);

export const onRequest = (req: IServerRequest): IApiResponse =>
  apiServer.onRequest(req);
