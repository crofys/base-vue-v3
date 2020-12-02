/**
 * @class GetTaskDto
 * @classdesc 获得任务列表 DTO
 */
export class GetTaskDto {
  /**
   * @member {string}任务名称
   */
  taskName: string;
  /**
   * @member {number} 执行人
   */
  assignorId: number | string;
  /**
   * @member {number} 任务类型 0.视频类、1.文献类、2.直播类、3.咨询类、4.其它
   */
  taskType: number | string;
  /**
   * @member {string} 生效日期
   */
  publishTime: string;
  /**
   * @member {string} 状态 0.已完成 1.未完成2.已过期
   */
  taskState: number | string;
  /**
   * @member {number} 任务序号
   */
  id: number | string;
  /**
   * @member {number} 当前页数
   */
  page: number;
  /**
   * @member {number} 分页
   */
  pageSize: number;
}
/**
 * @class CreateTaskDto
 * @classdesc 创建任务 DTO
 */
export class CreateTaskDto {
  /**
   * @member {string} 任务名称
   */
  taskName: string;
  /**
   * @member {string} 任务描述
   */
  taskDesc: string;
  /**
   * @member {string} 任务等级
   */
  taskLevel: number | string;
  /**
   * @member {number} 执行人
   */
  assignorName: number | string;
  /**
   * @member {number} 任务类型 0.视频类、1.文献类、2.直播类、3.咨询类、4.其它
   */
  taskType: number | string;
  /**
   * @member {string} 发布日期
   */
  publishTime: string;
  /**
   * @member {string} 结束日期
   */
  overTime: string;
  /**
   * @member {string} 链接地址
   */
  internetDiskLink: string;
}
/**
 * @class GetAllAssignorDto
 * @classdesc 获得所有执行人 DTO
 */
export class GetAllAssignorDto {
  /**
   * @member {string} 用户手机
   */
  phone: string;
  /**
   * @member {string} 用户昵称
   */
  name: string;
  /**
   * @member {number} 用户ID
   */
  id: number | string;
  /**
  //  * @member {number} 当前页数
  //  */
  // page: number;
  // /**
  //  * @member {number} 分页
  //  */
  // pageSize: number;
}
