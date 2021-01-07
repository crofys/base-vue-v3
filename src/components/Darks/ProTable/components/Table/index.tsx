import { defineComponent, reactive, ref, toRefs } from "vue";
import { defaultTableProps } from "ant-design-vue/es/table/Table";

// 类库 包
import { useRequest } from "@/common/hooks";

// 类型文件
import { TValueType, ISearch } from "../../types/index";
import { isFunction, isObject } from "lodash";

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
      type: Object,
      default: () => ({ tableColumns: [], searchColumns: [] }),
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

    return {
      params,
      loading,
      run,
      ...toRefs(state),
    };
  },
  methods: {
    /**
     * @description Table Change
     */
    handleTableChange(pagination: any) {
      const { current: page, pageSize } = pagination;
      this.params = Object.assign({}, this.params, { page, pageSize });
      this.run();
    },
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
  render() {
    const { dataList, loading, _pagination } = this;
    const { columns, tableProps } = this.$props;
    return (
      <a-table
        columns={columns.tableColumns}
        dataSource={dataList}
        loading={loading}
        pagination={_pagination}
        onChange={this.handleTableChange}
        vSlots={this.$slots}
        {...tableProps}
      ></a-table>
    );
  },
});
