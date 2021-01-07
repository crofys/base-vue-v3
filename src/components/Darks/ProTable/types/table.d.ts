import { ISearch } from "./search";
import { ColumnProps, TableProps } from "ant-design-vue/es/table/interface";

export type TValueType =
  | "default"
  | "money"
  | "select"
  | "date"
  | "dateTime"
  | "dateRange"
  | "time"
  | "idx";

export interface IColumns extends ColumnProps {
  hideInSearch?: boolean;
  hideInTable?: boolean;
  searchOption?: any | ISearch;
  valueType?: TValueType;
  valueEnum?: {
    label: string;
    value: any;
    [x: string]: any;
  }[];
  slots?: { customRender: string };
}

export type TAntTableProps = TableProps;
