<template>
  <div class="detail">
    <!-- 用户详情 -->
    <section class="detail__info">
      <ProDetail v-bind="detailProps" />
    </section>

    <a-divider />

    <!-- 任务列表 -->
    <ProTable v-bind="tableProps">
      <!-- 操作组件 -->
      <template v-slot:operation="{ record }">
        <div class="editable-row-operations">
          <span>
            <a @click="handleClickEnterDetail(record)">查看详情</a>
          </span>
        </div>
      </template>
    </ProTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { GetUserTaskListApi, GetUserDetailsApi } from "@/api";
// import { EditOutlined } from "@ant-design/icons-vue";

import {
  TASK_LEVEL_LIST,
  TASK_STATUS_LIST,
  TASK_TYPE_LIST,
} from "@/constant/task";
import { useRoute } from "vue-router";
import { useProTable } from "@/components/ProTable";
import { merge } from "lodash";
import { useProDetail } from "@/components/ProDetail";

export default defineComponent({
  data() {
    return {};
  },
  setup() {
    const {
      params: { id },
    } = useRoute();

    const tableRef = ref();
    const info = reactive({
      contractId: "1484340417",
      isSign: true,
      accountInfo: {
        avatarUrl: "",
        createTime: "",
        id: 0,
        isAuth: 0,
        joinUsId: 0,
        nick: "",
        phone: "",
        unionid: "",
      },
      joinInfo: {
        affiliatedIns: "",
        birthDate: "",
        certificatesPath: "",
        createTime: "",
        department: "",
        id: 0,
        idCard: "",
        identity: 1,
        name: "",
        phone: "",
        sex: 1,
        state: 0,
      },
    });

    // 详情组件属性 配置
    const detailProps = useProDetail({
      columns: [
        {
          title: "详情",
          bordered: true,
          column: 4,
          children: [
            {
              key: "accountInfo.avatarUrl",
              label: "头像",
              span: 1,
            },
            {
              key: "joinInfo.name",
              label: "姓名",
              span: 1,
            },
            {
              key: "accountInfo.nick",
              label: "昵称",
              span: 2,
            },
            {
              key: "accountInfo.id",
              label: "ID",
            },
            {
              key: "joinInfo.sex",
              label: "性别",
              valueType: "enum",
              valueEnum: [
                {
                  value: 0,
                  label: "女",
                },
                {
                  value: 1,
                  label: "男",
                },
              ],
            },
            {
              key: "accountInfo.phone",
              label: "电话",
            },
            {
              key: "joinInfo.birthDate",
              label: "出生年月",
            },
            {
              key: "joinInfo.idCard",
              label: "身份证号",
            },
            {
              key: "joinInfo.affiliatedIns",
              label: "所属医院",
            },
            {
              key: "joinInfo.department",
              label: "科室",
            },
            {
              key: "joinInfo.certificatesPath",
              label: "有效证件",
            },
          ],
        },
      ],
      request: () => GetUserDetailsApi(id),
      formatResult(res) {
        const { pepleDetail } = res.data || {};
        return merge(info, pepleDetail);
      },
    });

    // Table组件属性 配置
    const tableProps = useProTable({
      request: (_params: any) => {
        return GetUserTaskListApi(id, _params);
      },
      searchProps: {
        isShowColspan: false,
        layout: {
          span: 6,
        },
        formProps: {
          labelCol: { span: 8, offset: 2 },
          wrapperCol: { span: 12 },
        },
      },
      columns: [
        {
          title: "序号",
          dataIndex: "id",
          align: "center",
          width: 70,
        },
        {
          title: "名称",
          dataIndex: "taskName",
          hideInSearch: false,
        },
        {
          title: "任务等级",
          dataIndex: "taskLevel",
          valueType: "select",
          valueEnum: TASK_LEVEL_LIST,
          hideInSearch: false,
        },
        {
          title: "任务类型",
          dataIndex: "taskType",
          valueType: "select",
          valueEnum: TASK_TYPE_LIST,
          hideInSearch: false,
        },
        {
          title: "任务状态",
          dataIndex: "taskState",
          valueType: "select",
          valueEnum: TASK_STATUS_LIST,
        },
        {
          title: "提交时间",
          dataIndex: "createTime",
          hideInSearch: true,
        },
        {
          title: "操作",
          dataIndex: "operation",
          slots: { customRender: "operation" },
        },
      ],
    });

    return {
      info,
      tableRef,
      detailProps,
      tableProps,
    };
  },
  methods: {
    /**
     * @description 进入详情 Click
     */
    handleClickEnterDetail(row: any) {
      console.log(row, "----");
    },
  },
});
</script>

<style lang="less" scoped>
.detail {
  background: #fff;
  padding: 10px 20px;

  section {
    h2 {
      font-size: 18px;
      padding: 20px 10px;
      margin: 0;
    }
  }
}
</style>
