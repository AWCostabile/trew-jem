import { apiError } from 'server/api/api-error';
import { database } from 'server/mock-database';
import { IApiService, IRequestData, RequestType } from 'server/types/api';
import { IAuthProps } from 'shared/types/auth';

const authorize = {
  method: RequestType.GET,
  path: '/authorize',
  handler: async ({ headers = {} }: IRequestData<any>) => {
    if (
      !headers.authorization ||
      database.verifySession(headers.username, headers.authorization)
    ) {
      throw apiError({
        code: 'UNAUTHORIZED',
        status: 401
      });
    }

    return { data: { success: true } };
  }
};

const login: IApiService<any> = {
  method: RequestType.POST,
  path: '/login',
  handler: async ({ data }: IRequestData<IAuthProps>) => {
    const response = await database.getUser(data);

    return response;
  }
};

export const AuthController: Array<IApiService<any>> = [authorize, login];
