<template>
  <section class="table_wrap">
    <ProTable ref="tableRef" v-bind="tableProps">
      <!-- 操作组件 -->
      <template v-slot:operation="{ record }">
        <div class="editable-row-operations">
          <span>
            <router-link :to="{ path: `/user/${record.id}` }">详情</router-link>
            <a-divider type="vertical" />
            <a @click="handleClickEdit(record)">
              编辑
            </a>
          </span>
        </div>
      </template>
    </ProTable>

    <a-modal
      title="编辑用户"
      maskClosable
      v-model:visible="visible"
      @ok="handleChangeModalEdit"
    >
      <a-form ref="formRef" :model="forms">
        <a-form-item label="用户身份" required>
          <ProRadio
            :options="USER_IDENTITY_LIST"
            v-model:value="forms.identity"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { GetUserListApi, UpdateUserApi } from "@/api";

import { USER_IDENTITY_LIST, SIGN_AGREEMENT_LIST } from "@/constant/user";
import { useProTable } from "@/components/ProTable";

export default defineComponent({
  data() {
    return {
      USER_IDENTITY_LIST,
      visible: false,
      forms: { id: "", identity: 1 },
    };
  },
  setup() {
    const tableRef = ref();
    const tableProps = useProTable({
      request: GetUserListApi,
      columns: [
        {
          title: "ID",
          dataIndex: "id",
          align: "center",
          width: 70,
          hideInSearch: false,
        },
        {
          title: "昵称",
          dataIndex: "nick",
          hideInSearch: false,
        },
        {
          title: "姓名",
          dataIndex: "name",
          hideInSearch: false,
        },
        {
          title: "注册时间",
          dataIndex: "createTime",
          hideInSearch: true,
        },
        {
          title: "用户身份",
          dataIndex: "identity",
          valueType: "select",
          valueEnum: USER_IDENTITY_LIST,
          hideInSearch: false,
        },

        {
          title: "电话号码",
          dataIndex: "phone",
          hideInSearch: false,
        },
        {
          title: "注册时间",
          dataIndex: "createTime",
          valueType: "dateRange",
          hideInTable: true,
          hideInSearch: false,
        },
        {
          title: "所属医院",
          dataIndex: "department",
        },
        {
          title: "是否加入",
          dataIndex: "joinState",
        },
        {
          title: "签署协议",
          dataIndex: "isValid",
          valueType: "select",
          valueEnum: SIGN_AGREEMENT_LIST,
          hideInSearch: false,
        },
        {
          title: "操作",
          dataIndex: "operation",
          slots: { customRender: "operation" },
        },
      ],
    });
    return {
      tableRef,
      tableProps,
    };
  },
  methods: {
    /**
     * @description 点击 ｜ 操作-编辑按钮
     */
    async handleClickEdit(row: any) {
      this.visible = true;
      this.forms = { ...row };
    },
    /**
     * @description Change ｜ 弹出框修改
     */
    async handleChangeModalEdit() {
      try {
        const { id, ...params } = this.forms;
        await UpdateUserApi(id, params);
        (this as any).$message.success("更新成功！");
        this.tableRef.run();
        this.visible = false;
      } catch (error) {
        console.error("更新接口失败：", error);
      }
    },
  },
});
</script>

<style lang="less" scoped></style>
