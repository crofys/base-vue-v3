import { reactive } from "vue";
import { IColumns } from "../types/index";

import Slots from "../components/ValueType";

export function useColumns(columns: IColumns[]) {
  const _columns = reactive<any>({
    tableColumns: [],
    searchColumns: [],
  });
  for (const column of columns) {
    const {
      hideInSearch = true,
      hideInTable = false,
      valueType,
      searchOption,
      ...item
    } = column;
    /**
     * 自定义 table column 渲染
     * 当 valueType 是 string类型 则直接从Slots模版中渲染
     * 当 valueType 是 对象类型类型 则将配置参数Slots模版中传入并渲染
     */
    if (
      valueType &&
      Slots[valueType] &&
      typeof Slots[valueType]["Table"] === "function" &&
      !item["customRender"]
    ) {
      (item as any).customRender = (option: any) =>
        (Slots[valueType]["Table"] as any)(option, { props: item });
    }
    if (!hideInSearch) {
      _columns.searchColumns.push(
        Object.assign(item, { valueType, searchOption }),
      );
    }
    if (!hideInTable) {
      _columns.tableColumns.push(item);
    }
  }
  return {
    ..._columns,
  };
}
