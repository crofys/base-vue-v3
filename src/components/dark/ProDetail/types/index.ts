import { VNode } from "vue";

export interface IColumnsChildren {
  // 数据源的Key
  key: string;
  // 内容的描述
  label: string | VNode;
  // 包含列的数量	`1`
  span?: number;
  // 渲染类型
  valueType?: "enum";
  // 渲染枚举
  valueEnum?: { label: string; value: any }[];
  // 渲染的内容
  render?: (text: string, record: any) => JSX.Element;
}
export interface IColumns {
  // 描述列表的标题，显示在最顶部
  title: string | VNode;
  // 是否展示边框	 `false`
  bordered?: boolean;
  // 一行的 DescriptionItems 数量，可以写成像素值或支持响应式的对象写法 { xs: 8, sm: 16, md: 24}	 `3`
  column?: number;
  // 设置列表的大小。可以设置为 middle 、small, 或不填（只有设置 bordered={true} 生效）`default`
  size?: "default" | "middle" | "small";
  // 描述布局 `horizontal`
  layout?: "horizontal" | "vertical";
  // 配置 Descriptions.Item 的 colon 的默认值 `true`
  colon?: boolean;
  // 子项的列
  children: IColumnsChildren[];
}

export interface IProDetailsProps {
  dataSource: any;
  loading: boolean;
  columns: IColumns[];
}
