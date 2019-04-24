export interface IServerRequest {
  initialState?: object;
  route?: string;
  url?: string;
}

export interface IServerResponse {
  data: any;
  isJson?: boolean;
  status: number;
}
