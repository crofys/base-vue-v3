import { reactive } from "vue";
import { IColumns, TAntTableProps } from "../types";
import { isObject } from "lodash";

type TUseProTable = TAntTableProps & {
  columns: IColumns[];
  request: (...args: any[]) => any;
  searchProps?: any;
};

const initPagination = {
  page: 1,
  pageSize: 10,
};
const initTableProps = {
  rowKey: "id",
  bordered: true,
  pagination: initPagination,
};
export const useProTable = (options: TUseProTable) => {
  const optsReactive = reactive(Object.assign({}, initTableProps, options));

  if (isObject(options.pagination)) {
    optsReactive.pagination = Object.assign(
      {},
      initPagination,
      options.pagination,
    );
  }

  return optsReactive;
};
