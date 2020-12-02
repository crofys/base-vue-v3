<template>
  <Search v-model="params" :search-columns="searchColumns" :onSearch="run" />
  <section class="table_wrap">
    <div class="tool_bar">
      <router-link to="/task/edit">
        <a-button type="primary">
          新建
        </a-button>
      </router-link>

      <a-button class="export_btn">导出列表</a-button>
    </div>
    <a-table
      rowKey="id"
      :columns="columns"
      :data-source="dataList"
      :pagination="{
        current: params.page,
        total: total,
        pageSize: params.pageSize,
      }"
      :loading="loading"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      @change="handleTableChange"
      bordered
    >
      <!-- 序号 -->
      <!-- <template v-slot:index="{ index }"
        >{{ index + 1 + (params.page - 1) * params.pageSize }}
      </template> -->

      <!-- 可编辑组件 -->
      <template
        v-for="col in ['status']"
        v-slot:[col]="{ text, record }"
        :key="col"
      >
        <a-select
          v-if="record.editable"
          size="small"
          :value="text"
          @change="val => handleChangeEditStatus(record, val)"
        >
          <a-select-option
            v-for="item in taskList"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
        <template v-else>
          {{ text }}
        </template>
      </template>
      <!-- 操作组件 -->
      <template v-slot:operation="{ record }">
        <div class="editable-row-operations">
          <span>
            <a @click="handleClickEnterDetail(record)">详情</a>
            <a-divider type="vertical" />
            <a
              v-bind="editingKey !== '' ? { disabled: 'disabled' } : {}"
              @click="handleClickEdit(record)"
            >
              编辑
            </a>
          </span>
          <a-divider type="vertical" />
          <a-popconfirm
            title="是否确认删除?"
            @confirm="handleClickDelete(record)"
          >
            <a>删除</a>
          </a-popconfirm>
        </div>
      </template>
    </a-table>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { useRequest } from "@/common/hooks";
import { useService } from "./Service/index";
import {
  GetTaskDto,
  GetTaskListApi,
  UpdateTaskApi,
  DeleteTaskApi,
} from "@/api";

import Search from "@/components/Search";
import {
  TASK_LEVEL_LIST,
  TASK_STATUS_LIST,
  TASK_TYPE_LIST,
} from "@/constant/task";

const useTableSelect = () => {
  const selectedRowKeys = ref<any[]>([]);
  const selectedRows = ref<any[]>([]);

  const onSelectChange = (_selectedRowKeys: any[], _selectedRows: any[]) => {
    console.log("selectedRowKeys changed: ", _selectedRowKeys, _selectedRows);
    selectedRowKeys.value = _selectedRowKeys;
    selectedRows.value = _selectedRows;
  };

  return {
    selectedRowKeys,
    selectedRows,
    onSelectChange,
  };
};

export default defineComponent({
  components: { Search },
  data() {
    return {
      editingKey: "",
      taskList: TASK_STATUS_LIST,
    };
  },
  setup() {
    const tableSelect = useTableSelect();
    const params = ref<GetTaskDto>({
      id: "",
      taskName: "",
      assignorId: "",
      taskType: "",
      publishTime: "",
      taskState: "",
      page: 1,
      pageSize: 10,
    });
    const { columns, searchColumns } = useService();
    const state = reactive({
      dataList: [],
      total: 0,
    });
    const { loading, run } = useRequest(() => GetTaskListApi(params.value), {
      onSuccess(res) {
        state.dataList = res.data.map((item: any) => {
          const { label: taskType } =
            TASK_TYPE_LIST.find(k => k.value === item.taskType) || {};
          const { label: taskLevel } =
            TASK_LEVEL_LIST.find(k => k.value === item.taskLevel) || {};
          const { label: taskState } =
            TASK_STATUS_LIST.find(k => k.value === item.taskState) || {};
          return {
            ...item,
            taskType,
            taskLevel,
            taskState,
          };
        });
        state.total = res.count;
        console.log(state.dataList);
      },
    });
    return {
      run,
      params,
      loading,
      ...toRefs(state),
      columns,
      searchColumns,
      ...tableSelect,
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
    /**
     * @description 编辑 Click
     */
    handleClickEdit(row: any) {
      row.editable = true;
      this.editingKey = row.id;
    },
    /**
     * @description 更新状态 Change
     */
    async handleChangeEditStatus(row: any, taskState: number) {
      try {
        await UpdateTaskApi(row.id, taskState);
        (this as any).$message.success("更新成功！");
        this.run();
      } catch (error) {
        console.error("更新接口失败：", error);
      }
      row.editable = false;
      this.editingKey = "";
    },
    /**
     * @description 进入详情 Click
     */
    handleClickEnterDetail(row: any) {
      this.$router.push({
        path: "/task/" + row.id,
        query: row,
      });
    },
    /**
     * @description 删除 Click
     */
    async handleClickDelete(row: any) {
      try {
        await DeleteTaskApi(row.id);
        (this as any).$message.success("删除成功！");
        this.run();
      } catch (error) {
        console.error("删除接口失败：", error);
      }
    },
  },
});
</script>

<style lang="less">
.table_wrap {
  padding: 20px;
  background: #fff;
  .tool_bar {
    margin-bottom: 20px;
    text-align: right;
    .export_btn {
      margin-left: 20px;
    }
  }
}
</style>
