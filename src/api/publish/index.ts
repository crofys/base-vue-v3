import { Get, TResult } from "@/api/request";

const { VUE_APP_API_HOST: API_HOST } = process.env;

export const GET_PUBLISH_LIST = `${API_HOST}/api/anon/upload/list`;
export const DELETE_PUBLISH_LIST = `${API_HOST}/api/anon/upload/delete`;

/**
 * @description 发布 - 列表
 * @api http://api-center-bigdata.huan.tv/project/463/interface/api/7397
 */
export const GetPublishListApi = (params: any): TResult<any> => {
  return Get(GET_PUBLISH_LIST, { params });
};
/**
 * @description 发布 - 删除
 * @api http://api-center-bigdata.huan.tv/project/463/interface/api/7397
 */
export const DeletePublishApi = (id: any): TResult<any> => {
  return Get(DELETE_PUBLISH_LIST, { params: { id } });
};
