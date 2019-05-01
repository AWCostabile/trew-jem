interface IApiErrorConfig {
  code?: string;
  reason?: string;
  status?: number;
}

export interface IApiErrorInstance extends Error {
  code: string;
  isApiError: boolean;
  reason: string;
  status: number;
}

export const apiError = ({
  code = 'UNKNOWN_ERROR',
  reason = '',
  status = 500
}: IApiErrorConfig): IApiErrorInstance => {
  const error = new Error(reason) as IApiErrorInstance;

  error.isApiError = true;

  error.code = code;

  if (reason) {
    error.reason = reason;
  }

  error.status = status;

  return error;
};
