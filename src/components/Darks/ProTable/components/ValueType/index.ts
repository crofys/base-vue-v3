import { TValueType } from "../../types";
import Money from "./components/Money/index";
import DateTime from "./components/DateTime/index";
import DateRange from "./components/DateRang/index";
import Time from "./components/Time/index";
import Idx from "./components/Idx/index";
import Select from "./components/Select/index";
import defaultComponents from "./components/Default/index";
import Date from "./components/Date/index";

// https://procomponents.ant.design/components/table#valuetype-%E5%80%BC%E7%B1%BB%E5%9E%8B
const ValueType: Record<TValueType, { Table?: Function; Search?: Function }> = {
  idx: Idx,
  money: Money,
  date: Date,
  dateTime: DateTime,
  dateRange: DateRange,
  time: Time,
  select: Select,
  default: defaultComponents,
};

export default ValueType;
