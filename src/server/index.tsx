import { onRequest } from 'server/api';
import { IServerRequest } from 'server/types/general';
import * as WebServer from 'server/web';

export const parseRequest = async (incoming: IServerRequest) => {
  const { url } = incoming;
  try {
    if (API_SERVER && url.match(new RegExp(`^${API_SERVER}`))) {
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

    const data = err.isApiError
      ? { error: { code: err.code, reason: err.reason, status: err.status } }
      : err;

    console.error(
      `\x1b[31m[${status}]\x1b[0m Error handling request for '\x1b[36m${url}\x1b[0m'\n\x1b[31m\x1b[2m`,
      data,
      '\x1b[0m'
    );

    return {
      status,
      data
    };
  }
};
