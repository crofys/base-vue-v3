import { TResult } from "@/utils/request";

const { VUE_APP_API_HOST: API_HOST } = process.env;

export const POST_LOGIN = `${API_HOST}/api/anon/login`;
/**
 * @description 登录
 * @api
 */
export const LoginApi = (params: any): TResult<any> => {
  return new Promise((resolve, reject) => {
    const { password, username } = params;
    if (!username || !["admin"].includes(username)) {
      reject("用户名不存在");
    }
    if (!password || !["1q2w3e4r"].includes(password)) {
      reject("密码错误");
    }
    resolve({
      code: 200,
      msg: "登录成功",
      data: {
        username,
      },
    });
  });
  // return Get(POST_LOGIN, { params });
};
