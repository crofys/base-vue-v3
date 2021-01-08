import { defineComponent, PropType, reactive } from "vue";

// 类库 包
import { useRequest } from "@/common/hooks";
import { useColumns } from "./hooks/useColumns";

// 组件
import Search from "./components/Search/index";
import Table from "./components/Table/index";

import { isFunction, isObject } from "lodash";

// 类型文件
import { IColumns } from "./types/index";
import "./index.less";

export default defineComponent({
  props: {
    columns: {
      required: true,
      type: Array as PropType<IColumns[]>,
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
  setup(props, { slots }) {
    const params = reactive<any>({});

    const state = reactive({
      dataList: [],
      total: 0,
    });

    const { tableColumns, searchColumns } = useColumns(props.columns as any[]);
    // pagination 有参数 则分页设置
    if (isObject(props.pagination)) {
      params.pagination = Object.assign(params, props.pagination);
    }

    const { loading, run } = useRequest(
      async () => {
        if (isFunction(props.request)) return props?.request(params.value);
      },
      {
        onSuccess(res) {
          console.log("数据请求成功", res);
          state.dataList = res?.data;
          state.total = res?.count;
        },
      },
    );
    const handleTableChange = (pagination: any) => {
      const { current: page, pageSize } = pagination;
      Object.assign({}, params, { page, pageSize });
      run();
    };

    return () => {
      const { searchProps, ...tableProps } = props;
      return (
        <div class="pro-table">
          <Search
            v-model={params.value}
            columns={searchColumns}
            onSearch={run}
            {...searchProps}
          />
          <Table
            {...tableProps}
            columns={tableColumns}
            dataSource={state.dataList}
            loading={loading.value}
            onChange={handleTableChange}
          >
            {slots}
          </Table>
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
