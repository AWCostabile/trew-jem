import {
  IApiRoutes,
  IApiService,
  IServerRequest,
  RequestType
} from 'server/types';

export class ApiServer {
  routes: IApiRoutes = {
    [RequestType.GET]: [],
    [RequestType.POST]: []
  };

  constructor(services: IApiService[] = []) {
    services.forEach(this.register);
  }

  matchService = (method: string, path: string) =>
    (this.routes[method] || []).find(service => !!service.path.match(path));

  onRequest = async (request: IServerRequest) => {
    const { method, url } = request;
    const service = this.matchService(method.toLowerCase(), url);

    if (service) {
      const response = await service.handler(request);

      return response;
    }

    return {};
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
