declare const APP_LOGO: string;
declare const BASE_URL: string;
declare const DEVELOPMENT: boolean;
declare const LOCAL_BUILD: boolean;
declare const SERVER: boolean;

declare namespace NodeJS {
  interface Global {
    window: any;
    document: any;
  }
}
