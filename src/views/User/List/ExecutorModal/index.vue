<template>
  <a-modal
    v-model:visible="visible"
    title="选择任务发送人"
    width="920px"
    @ok="handleClickOk"
  >
    <div>
      <Search
        v-model="params"
        :customLayout="{ span: 6 }"
        :search-columns="searchColumns"
        :onSearch="run"
      >
        <template v-slot:btn="{ onSubmit }">
          <a-button type="primary" @click="onSubmit">
            搜索
          </a-button>
        </template>
      </Search>
      <section>
        <a-table
          rowKey="id"
          :columns="columns"
          :data-source="dataList"
          :loading="loading"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
          }"
          bordered
        />
      </section>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from "vue";
import { useRequest } from "@/common/hooks";
import { useService } from "./service";
import { GetAllAssignorApi, GetAllAssignorDto } from "@/api";

import Search from "@/components/Search";

const useTableSelect = () => {
  const selectedRowKeys = ref<any[]>([]);
  const selectedRows = ref<any[]>([]);
  const selectedText = computed<string>(
    () => selectedRows.value.map(k => k.name).join(",") || "请选择",
  );

  const onSelectChange = (_selectedRowKeys: any[], _selectedRows: any[]) => {
    selectedRowKeys.value = _selectedRowKeys;
    selectedRows.value = _selectedRows;
  };

  return {
    selectedText,
    selectedRowKeys,
    selectedRows,
    onSelectChange,
  };
};

export default defineComponent({
  components: { Search },
  props: { value: String },
  data() {
    return {
      visible: false,
    };
  },
  setup() {
    const tableSelect = useTableSelect();
    const params = ref<GetAllAssignorDto>({
      id: "",
      name: "",
      phone: "",
    });
    const { columns, searchColumns } = useService();
    const state = reactive({
      dataList: [],
    });
    const { loading, run } = useRequest(() => GetAllAssignorApi(params.value), {
      onSuccess(res) {
        state.dataList = res.data;
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
    handleClcikChoose() {
      this.visible = true;
    },
    handleClickOk() {
      this.visible = false;
      this.$emit("update:value", this.selectedRowKeys?.join(","));
    },
  },
});
</script>

<style lang="less"></style>
