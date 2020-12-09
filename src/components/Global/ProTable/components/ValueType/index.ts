import { TValueType } from "../../types";
import money from "./components/money";
import date from "./components/date";
import dateTime from "./components/dateTime";
import dateRange from "./components/dateRange";
import time from "./components/time";
import idx from "./components/idx";
import select from "./components/select";
import defaultComponents from "./components/default";

// https://procomponents.ant.design/components/table#valuetype-%E5%80%BC%E7%B1%BB%E5%9E%8B
const ValueType: Record<TValueType, { Table?: Function; Search?: Function }> = {
  idx,
  money,
  date,
  dateTime,
  dateRange,
  time,
  select,
  default: defaultComponents,
};

export default ValueType;
