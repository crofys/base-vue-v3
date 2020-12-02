import valueComponents from "../ValueType";
import { IColumnsChildren } from "../../types";
import { get, isFunction } from "lodash";

/**
 * @description 详情 - 列表
 * @param dataSource 数据源
 * @param columnsList 渲染列
 */
export const renderDetailsItem = (
  dataSource: any,
  columnsList: IColumnsChildren[],
) => {
  return columnsList.map(_column => {
    const { key, label, render, valueType, ...column } = _column;
    const text = get(dataSource, key);

    let template = text;
    if (valueType && valueComponents[valueType]) {
      template = valueComponents[valueType](text, _column);
    }
    if (isFunction(render)) {
      template = render(text, dataSource);
    }
    return (
      <a-descriptions-item label={label} {...column}>
        {template}
      </a-descriptions-item>
    );
  });
};
