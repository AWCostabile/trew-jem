import { LoginController } from './controllers/login';
import { IServerRequest } from 'server/types/general';
import { ApiServer } from './service';

const apiServer = new ApiServer([...LoginController]);

export const onRequest = (req: IServerRequest): IApiResponse =>
  apiServer.onRequest(req);
