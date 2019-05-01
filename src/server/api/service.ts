import { IApiRoutes, IApiService, RequestType } from 'server/types/api';
import { IServerRequest } from 'server/types/general';
import { apiError } from './api-error';

export class ApiServer {
  routes: IApiRoutes = {
    [RequestType.GET]: [],
    [RequestType.POST]: []
  };

  constructor(services: IApiService[] = []) {
    services.forEach(this.register);
  }

  matchService = (method: string, path: string) =>
    (this.routes[method] || []).find(
      service => !!service.path.match(new RegExp(`${path}?`))
    );

  onRequest = async (request: IServerRequest) => {
    const { body: data, headers, method, query, params, url } = request;
    const path = url.split('?')[0].toLowerCase();
    const service = this.matchService(method.toLowerCase(), path);

    if (!!service) {
      return await service.handler({ data, headers, params, query });
    }

    throw apiError({
      code: 'UNMATCHED_ROUTE',
      reason: `no api endpoint found for ${method.toUpperCase()} request '${path}'`,
      status: 404
    });
  };

  register = ({ method, path, handler }: IApiService) => {
    if (!this.routes[method]) {
      throw new Error(`Method '${method}' not supported by API service`);
    }

    this.routes[method].push({
      handler,
      path: `${API_SERVER}${path}`
    });
  };
}
