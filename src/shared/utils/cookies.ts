import * as JsCookie from 'js-cookie';

export const Cookies = {
  get: JsCookie.get,
  getJSON: JsCookie.getJSON,
  remove: JsCookie.remove,
  set: (key: string, value: any, options?: JsCookie.CookieAttributes) => {
    JsCookie.set(key, value, { ...options, secure: !LOCAL_BUILD });
  }
};
