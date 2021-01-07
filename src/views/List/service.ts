import { Get, TResult } from "@/utils/request";

const { VUE_APP_API_HOST: API_HOST } = process.env;

export const GET_USER_LIST = `${API_HOST}/api/anon/data/people/list`;
export const GET_USER_DETAIL = `${API_HOST}/api/anon/data/people/detail`;
export const GET_USER_TASK_LIST = `${API_HOST}/api/anon/data/task/search`;
export const UPDATE_USER = `${API_HOST}/api/anon/data/people/update`;

/**
 * @description 用户 - 列表
 * @api http://api-center-bigdata.huan.tv/project/463/interface/api/7397
 */
export const GetUserListApi = (params: any): TResult<any> => {
  return Get(GET_USER_LIST, { params });
};
/**
 * @description 用户 - 任务列表
 * @api http://api-center-bigdata.huan.tv/project/463/interface/api/7397
 */
export const GetUserTaskListApi = (id: any, params: any): TResult<any> => {
  return Get(GET_USER_TASK_LIST, { params: { id, ...params } });
};
/**
 * @description 用户 - 详情
 * @api http://api-center-bigdata.huan.tv/project/463/interface/api/7397
 */
export const GetUserDetailsApi = (id: any): TResult<any> => {
  return Get(GET_USER_DETAIL, { params: { id } });
};
/**
 * @description 用户 - 编辑
 * @api http://api-center-bigdata.huan.tv/project/463/interface/api/7397
 */
export const UpdateUserApi = (id: any, params: any): TResult<any> => {
  return Get(UPDATE_USER, { params: { id, ...params } });
};
