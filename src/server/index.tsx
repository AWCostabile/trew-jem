import { ServeRequest } from 'server/server';
import { IServerRequest, IServerResponse } from 'server/types';

export const parseRequest = (incoming: IServerRequest): IServerResponse => {
  try {
    return ServeRequest(incoming);
  } catch (err) {
    const status = err.status || 500;

    console.error(
      `\x1b[31m[${status}]\x1b[0m Error handling request for '\x1b[36m${incoming.url ||
        incoming.route}\x1b[0m'\n\x1b[31m\x1b[2m`,
      err,
      '\x1b[0m'
    );

    return {
      status,
      data: err
    };
  }
};
