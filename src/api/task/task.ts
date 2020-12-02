import { Get, Post, TResult } from "@/api/request";
import { GetTaskDto, CreateTaskDto, GetAllAssignorDto } from "./task.dto";

const { VUE_APP_API_HOST: API_HOST } = process.env;

export const GET_TASK_DATA_LIST = `${API_HOST}/api/anon/data/task/info/pagelist`;
export const POST_CREATE_TASK = `${API_HOST}/api/anon/data/task/info/add`;
export const POST_UPDATE_TASK = `${API_HOST}/api/anon/data/task/info/update`;
export const GET_TASK_DETAIL = `${API_HOST}/api/anon/data/task/info/detail`;
export const GET_TASK_ASSIGNOR_BY_ID = `${API_HOST}/api/anon/data/assignor/info`;
export const GET_DELETE_TASK = `${API_HOST}/api/anon/data/task/info/delete`;
export const GET_ALL_ASSIGNOR_LIST = `${API_HOST}/api/anon/data/assignor/all/data`;
export const EXPORT_EXCEL = `${API_HOST}/api/anon/export/excel`;

// 受邀手机号
export const GET_INVITEES_PHONE_LIST = `${API_HOST}/api/anon/query/invite/phone/page/info`;
// 导入-手机号
export const POST_IMPORT_PHONE = `${API_HOST}/api/anon/opencloud/import/invite/phone`;
// 发送-邀请码
export const GET_SEND_PHONE_CODE = `${API_HOST}/opencloud/send/phone/invite/code`;
export const GET_SEND_PHONE_CODE_LIST = `${API_HOST}/opencloud/find/invite/code/page/list/info`;

/**
 * @description 任务列表-分页
 * @api http://api-center-bigdata.huan.tv/project/463/interface/api/7349
 */
export const GetTaskListApi = (params: GetTaskDto): TResult<any> => {
  return Get(GET_TASK_DATA_LIST, { params });
};
/**
 * @description 添加任务
 * @api http://api-center-bigdata.huan.tv/project/463/interface/api/7381
 */
export const CreateTaskApi = (params: CreateTaskDto): TResult<any> => {
  return Post(POST_CREATE_TASK, { params });
};
/**
 * @description 更新任务
 * @api http://api-center-bigdata.huan.tv/project/463/interface/api/7385
 */
export const UpdateTaskApi = (id: string, taskState: number): TResult<any> => {
  return Post(POST_UPDATE_TASK, { params: { id, taskState } });
};
/**
 * @description 删除任务
 * @api http://api-center-bigdata.huan.tv/project/463/interface/api/7393
 */
export const DeleteTaskApi = (id: string): TResult<any> => {
  return Get(GET_DELETE_TASK, { params: { id } });
};
/**
 * @description 所有执行人-数据
 * @api http://api-center-bigdata.huan.tv/project/463/interface/api/7397
 */
export const GetAllAssignorApi = (params: GetAllAssignorDto): TResult<any> => {
  return Get(GET_ALL_ASSIGNOR_LIST, { params });
};
/**
 * @description 通过任务id执行人-数据
 * @api http://api-center-bigdata.huan.tv/project/463/interface/api/7397
 */
export const GetAssignorByTaskIdApi = (
  taskId: any,
  params: any,
): TResult<any> => {
  return Get(GET_TASK_ASSIGNOR_BY_ID, { params: { taskId, ...params } });
};
/**
 * @description 获得任务详情-数据
 * @api http://api-center-bigdata.huan.tv/project/463/interface/api/7401
 */
export const GetTaskDetailApi = (id: any): TResult<any> => {
  return Get(GET_TASK_DETAIL, { params: { id } });
};
/**
 * @description 导出Excel
 */
export const ExportExcel = (ids: string): TResult<any> => {
  return Get(EXPORT_EXCEL, {
    params: { ids },
    responseType: "blob",
  });
};
/**
 * @description 受邀手机号
 */
export const GetInviteesPhoneList = (params: any): TResult<any> => {
  return Get(GET_INVITEES_PHONE_LIST, { params });
};
/**
 * @description 导入-手机号
 */
export const PostImportPhone = (params: any): TResult<any> => {
  return Post(POST_IMPORT_PHONE, {
    params,
    transformParams: () => ({ data: params }),
  });
};
/**
 * @description 发送-邀请码
 */
export const GetSendPhoneCode = (params: any): TResult<any> => {
  return Get(GET_SEND_PHONE_CODE, { params });
};
/**
 * @description 邀请码分页列表
 */
export const GetSendPhoneCodeListInfo = (params: any): TResult<any> => {
  return Get(GET_SEND_PHONE_CODE_LIST, { params });
};
