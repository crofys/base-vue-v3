import { VNode } from "vue";
import { TFormItemValueType } from "./components";
interface IValueEnum {
  value: any;
  label: string;
  [item: string]: any;
}
export interface ISearch {
  id: string;
  label: string;
  valueType: TFormItemValueType;
  valueEnum?: IValueEnum[];
  format?: string; // 时间类组件使用 YYYY-MM-DD |timestamp
  valueProp?: any; // 直接传入对应组件属性
  render?: (h: any) => VNode[];
  [item: string]: any;
}
export interface IFormItemProps extends ISearch {
  value: any;
  change: (val: any) => void;
}
