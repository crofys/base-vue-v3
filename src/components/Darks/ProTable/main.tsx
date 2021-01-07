import { defineComponent, reactive, ref } from "vue";

// 类库 包
import { useRequest } from "@/common/hooks";
import { useColumns } from "./hooks/useColumns";

// 组件
import Search from "./components/Search/index";
// import Table from "./components/Table/index";

import { isFunction, isObject } from "lodash";

// 类型文件
import { TValueType, ISearch } from "./types/index";
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
    columns: {
      required: true,
      type: Array,
      default: () => [],
    },
    request: {
      required: true,
      type: Function,
    },
    pagination: {
      required: false,
      type: Object,
    },
    searchProps: {
      required: false,
      type: Object,
    },
    tableProps: {
      required: false,
      type: Object,
    },
  },
  setup(props) {
    const params = ref({});

    const state = reactive({
      dataList: [],
      total: 0,
    });

    const { tableColumns, searchColumns } = useColumns(props.columns as any[]);
    // pagination 有参数 则分页设置
    if (isObject(props.pagination)) {
      params.value = Object.assign(params.value, props.pagination);
    }

    const { loading, run } = useRequest(
      async () => {
        if (isFunction(props.request)) return props?.request(params.value);
      },
      {
        onSuccess(res) {
          state.dataList = res?.data;
          state.total = res?.count;
        },
      },
    );
    console.log(tableColumns, loading);

    return () => {
      const { searchProps } = props;
      return (
        <div class="pro-table">
          <Search
            v-model={params}
            columns={searchColumns}
            onSearch={run}
            {...searchProps}
          />
        </div>
      );
    };
  },
  methods: {
    // /**
    //  * @description Table Change
    //  */
    // handleTableChange(pagination: any) {
    //   const { current: page, pageSize } = pagination;
    //   this.params = Object.assign({}, this.params, { page, pageSize });
    //   this.run();
    // },
  },

  // render() {
  //   const { dataList, params, loading } = this;
  //   const { columns, tableProps, searchProps } = this.$props;
  //   return (
  //     <div class="pro-table">
  //       <Search
  //         v-model={params}
  //         searchColumns={columns.searchColumns}
  //         onSearch={this.run}
  //         {...searchProps}
  //       />
  //       <Table
  //         columns={columns.tableColumns}
  //         dataSource={dataList}
  //         loading={loading}
  //         onChange={this.handleTableChange}
  //         vSlots={this.$slots}
  //         {...tableProps}
  //       ></Table>
  //     </div>
  //   );
  // },
});
