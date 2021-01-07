import { defineComponent } from "vue";
import { defaultTableProps } from "ant-design-vue/es/table/Table";

// 类库 包

// 类型文件
import { TValueType, ISearch } from "../../types/index";
import { isObject } from "lodash";

import "./index.less";

export interface IColumns {
  hideInSearch?: boolean;
  hideInTable?: boolean;
  searchOption?: any | ISearch;
  valueType?: TValueType;
  [x: string]: any;
}

export default defineComponent({
  props: {
    ...defaultTableProps,
    columns: {
      required: true,
      type: Array,
      default: () => [],
    },
    pagination: {
      required: false,
      type: Object,
    },
  },
  setup(props, { slots }) {
    console.log(props, "-------props");
    return () => (
      <a-table
        // pagination={_pagination}
        // onChange={this.handleTableChange}
        // vSlots={this.$slots}
        vSlots={slots}
        {...props}
      ></a-table>
    );
  },
  computed: {
    _pagination() {
      const { pagination, total }: any = this;
      return isObject(pagination)
        ? Object.assign(
            {
              total,
            },
            pagination,
          )
        : pagination;
    },
  },
});
