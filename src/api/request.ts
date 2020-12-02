import axios, { Method, AxiosRequestConfig } from "axios";
import { message } from "ant-design-vue";
import { Local } from "@/utils/local";
import Qs from "qs";
import { validate } from "class-validator";

export type TResult<T = any> = Promise<{
  data: T;
  code: number;
  count?: number;
  msg: string;
}>;

export const Validate = async (params: any, dto: any) => {
  const _dto = new dto();
  const _params = Object.assign(_dto, params);
  try {
    await validate(_params, {
      skipMissingProperties: true,
    });
  } catch (error) {
    console.error("参数校验错误：", error);
    throw error;
  }
};

const request = axios.create({
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  withCredentials: true,
});

request.interceptors.request.use(
  config => {
    // if (store.getters.getUser.token) {
    //   config.headers.common['token'] = store.getters.getUser.token;
    // }
    config.headers.unionid = "OVVWbiGXpGltBsEosIFx";
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  res => {
    const { msg, code, data, ...response } = res.data || {};
    if (!res.data) {
      return Promise.reject("文件不存在");
    } else {
      if (code) {
        switch (code) {
          case 200:
            return { ...response, data };
          case 401:
            // history.push("/login");
            return;
          default:
            message.error(msg);
            return Promise.reject(res.data);
        }
      } else {
        return res.data;
      }
    }
  },
  err => {
    switch (err.response.status) {
      case 400:
        break;
      case 401:
        break;
      case 405:
      case 500:
      default:
        break;
    }
    return Promise.reject(err.response);
  },
);

interface RequestOptions extends Partial<AxiosRequestConfig> {
  isAuth?: boolean;
  urlFields?: string[];
  transformParams?: (params: any) => any;
}
const createMethod = (method: Method = "get") => (
  url: string,
  options?: RequestOptions,
) => {
  const {
    urlFields,
    isAuth = true,
    headers = {},
    transformParams,
    params,
    ...args
  } = options || {};

  let data = ["get"].includes(method)
    ? { params }
    : { data: Qs.stringify(params) };
  if (typeof transformParams === "function") {
    data = transformParams(params);
  }

  // 过滤URl参数
  if (urlFields) {
    for (const key of urlFields) {
      url = url.replace(new RegExp(`:${key}`), (params as any)[key]);
    }
  }

  //接口增加权限token
  if (isAuth) {
    const { users } =
      Local.get(process.env.VUE_APP_LOCAL_KEY_GLOBAL || "") || {};
    if (users && users["x-auth-token"]) {
      (headers as any)["x-auth-token"] = users["x-auth-token"];
    }
  }

  return request(url, {
    method,
    headers,
    ...data,
    ...args,
  } as any) as Promise<any>;
};

export const Post = createMethod("post");
export const Get = createMethod("get");
export const Delete = createMethod("delete");
export const Put = createMethod("put");

export default request;
