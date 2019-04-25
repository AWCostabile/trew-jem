import { IApiService, IServerRequest, RequestType } from 'server/types';

const login = {
  method: RequestType.GET,
  path: '/login',
  handler: async (req: IServerRequest) =>
    await {
      data: { username: 'test' }
    }
};

export const LoginController: IApiService[] = [login];
