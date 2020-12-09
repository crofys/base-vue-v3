import Cookies from "js-cookie";
import { isObject, isString } from "./utils";

interface CookieOptions {
  expires?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
}

export interface Cookie {
  set: (key: string, data: any, option?: CookieOptions) => void;
  get: (key: string) => any;
  clear: () => void;
  remove: (key: string, option?: CookieOptions) => void;
}

export const Cookie: Readonly<Cookie> = {
  set: (key: string, data: any, option?: CookieOptions): void => {
    const { expires = 1, path = "/", domain = "", secure = false } =
      option || {};
    if (isObject(data)) {
      data = JSON.stringify(data);
    }
    Cookies.set(key, data, { expires, path, domain, secure });
  },
  get: (key: string): any => {
    let _val: any = Cookies.get(key) || null;
    if (isString(_val)) {
      try {
        _val = JSON.parse(_val);
      } catch (error) {
        console.error(error);
      }
    }
    return _val;
  },
  clear: (): void => {
    document.cookie = "";
  },
  remove: (key: string, option?: CookieOptions): void => {
    const { path = "/", domain = "" } = option || {};
    Cookies.remove(key, { path, domain });
  },
};
