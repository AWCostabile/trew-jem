import { onRequest } from 'server/api';
import { IServerRequest } from 'server/types/general';
import * as WebServer from 'server/web';

export const parseRequest = async (incoming: IServerRequest) => {
  try {
    if (API_SERVER && incoming.url.match(new RegExp(`^${API_SERVER}`))) {
      const { data = {}, headers = {}, status = 200 } = await onRequest(
        incoming
      );

      return {
        data,
        headers: { 'content-type': 'application/json', ...headers },
        isJson: true,
        status
      };
    }

    return WebServer.ServeRequest(incoming);
  } catch (err) {
    const status = err.status || 500;

    console.error(
      `\x1b[31m[${status}]\x1b[0m Error handling request for '\x1b[36m${
        incoming.route
      }\x1b[0m'\n\x1b[31m\x1b[2m`,
      err,
      '\x1b[0m'
    );

    return {
      status,
      data: err
    };
  }
};
