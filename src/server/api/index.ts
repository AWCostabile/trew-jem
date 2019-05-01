import { IApiResponse } from 'server/types/api';
import { IServerRequest } from 'server/types/general';
import { AuthController } from './controllers/auth';
import { ApiServer } from './service';

const apiServer = new ApiServer([...AuthController]);

export const onRequest = (req: IServerRequest): IApiResponse =>
  apiServer.onRequest(req);
