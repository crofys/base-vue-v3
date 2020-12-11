import { ISearch } from "./search.d";
export type TValueType =
  | "default"
  | "money"
  | "select"
  | "date"
  | "dateTime"
  | "dateRange"
  | "time"
  | "idx";
export interface IColumns {
  hideInSearch?: boolean;
  hideInTable?: boolean;
  searchOption?: any | ISearch;
  valueType?: TValueType;
  [x: string]: any;
}
