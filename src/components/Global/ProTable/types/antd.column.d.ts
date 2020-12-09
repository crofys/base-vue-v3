export interface IAntdTableColumns {
  title: import("vue-types").VueTypeValidableDef<
    import("../_util/type").VueNode
  >;
  key: import("vue-types").VueTypeDef<string | number>;
  dataIndex: import("vue-types").VueTypeValidableDef<string> & {
    default: string;
  };
  customRender: import("vue-types").VueTypeValidableDef<
    (...args: any[]) => any
  > & {
    default: (...args: any[]) => any;
  };
  customCell: import("vue-types").VueTypeValidableDef<
    (...args: any[]) => any
  > & {
    default: (...args: any[]) => any;
  };
  customHeaderCell: import("vue-types").VueTypeValidableDef<
    (...args: any[]) => any
  > & {
    default: (...args: any[]) => any;
  };
  align: import("vue-types").VueTypeDef<"center" | "left" | "right">;
  ellipsis: import("vue-types").VueTypeValidableDef<boolean>;
  filters: import("vue-types").VueTypeDef<
    {
      text: string;
      value: string;
      children:
        | unknown[]
        | (((props: Record<string, unknown>) => unknown[]) &
            (() => unknown[]) &
            (() => unknown[]));
    }[]
  >;
  filterMultiple: import("vue-types").VueTypeValidableDef<boolean>;
  filterDropdown: import("vue-types").VueTypeValidableDef<any>;
  filterDropdownVisible: import("vue-types").VueTypeValidableDef<boolean>;
  sorter: import("vue-types").VueTypeDef<any>;
  defaultSortOrder: import("vue-types").VueTypeDef<
    import("./interface").SortOrder
  >;
  colSpan: import("vue-types").VueTypeValidableDef<number> & {
    default: number;
  };
  width: import("vue-types").VueTypeDef<string | number>;
  className: import("vue-types").VueTypeValidableDef<string> & {
    default: string;
  };
  fixed: import("vue-types").VueTypeDef<boolean | "left" | "right">;
  filterIcon: import("vue-types").VueTypeValidableDef<any>;
  filteredValue: import("vue-types").VueTypeValidableDef<unknown[]> & {
    default: () => unknown[];
  };
  filtered: import("vue-types").VueTypeValidableDef<boolean>;
  defaultFilteredValue: import("vue-types").VueTypeValidableDef<unknown[]> & {
    default: () => unknown[];
  };
  sortOrder: import("vue-types").VueTypeDef<boolean | "descend" | "ascend">;
  sortDirections: import("vue-types").VueTypeValidableDef<unknown[]> & {
    default: () => unknown[];
  };
}
