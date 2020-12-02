import { Get, TResult } from "@/api/request";

const { VUE_APP_API_HOST: API_HOST } = process.env;

export const GET_EXPORT_EXCEL = `${API_HOST}/api/anon/export/excel`;
export const GET_PUBLISH_APP = `${API_HOST}/api/anon/add/upload/update`;
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
/**
 * @description 任务列表-分页
 * @api http://api-center-bigdata.huan.tv/project/463/interface/api/7349
 */
export const GetCommonListApi = (params: any): TResult<any> => {
  return Get(GET_EXPORT_EXCEL, { params });
};
/**
 * @description 发布App
 * @api http://api-center-bigdata.huan.tv/project/463/interface/api/7349
 */
export const PublishAppApi = (params: any): TResult<any> => {
  return Get(GET_PUBLISH_APP, { params });
};
