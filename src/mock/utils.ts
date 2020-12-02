/*
 * @Description: mock task
 * @Author: 徐长剑
 * @Date: 2020-04-07 10:14:30
 * @LastEditTime: 2020-04-07 11:16:58
 * @LastEditors: 徐长剑
 */
import Mockjs from "mockjs";

const createMockMethodFactory = (method: string) => (
  url: string,
  template: any,
) => Mockjs.mock(url, method, template);

export type TMethod = "get" | "post" | "delete" | "put";

export const Mock: any = {
  get: createMockMethodFactory("get"),
  post: createMockMethodFactory("post"),
  delete: createMockMethodFactory("delete"),
  put: createMockMethodFactory("put"),
};
export const Result = (data: any, message = "请求成功", code = 200) => {
  return {
    data,
    message,
    code,
  };
};
