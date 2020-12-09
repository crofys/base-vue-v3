import { reactive } from "vue";
import { useColumns } from "./useColumns";
import { IColumns } from "../types";
import { isObject } from "lodash";

type TUseProTable = {
  columns: IColumns[];
  request: (...args: any[]) => any;
  pagination?: any;
  tableProps?: any;
  searchProps?: any;
};

const initPagination = {
  page: 1,
  pageSize: 10,
};
const initTableProps = {
  rowKey: "id",
  bordered: true,
};
export const useProTable = (options: TUseProTable) => {
  const { columns, ..._options } = reactive(options);
  const { pagination = {}, tableProps = {} } = _options;
  const _columns = useColumns(columns);

  // 如果`pagination`为 对象类型 则初始化分页数据
  if (isObject(pagination)) {
    _options.pagination = Object.assign({}, initPagination, pagination);
  }
  // 如果`tables`为 对象类型
  if (isObject(tableProps)) {
    _options.tableProps = Object.assign(
      {},
      initTableProps,
      _options.tableProps,
    );
  }

  return {
    columns: _columns,
    ..._options,
  };
};
