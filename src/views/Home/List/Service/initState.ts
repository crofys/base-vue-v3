import { ref } from "vue";
import { ISearch } from "@/components/Search/interface";
import { TASK_TYPE_LIST, TASK_STATUS_LIST } from "@/constant/task";

export function useInitState() {
  const columns = ref([
    {
      title: "序号",
      dataIndex: "id",
      align: "center",
      width: 70,
      // slots: { customRender: "index" },
    },
    {
      title: "名称",
      dataIndex: "taskName",
    },
    {
      title: "任务等级",
      dataIndex: "taskLevel",
    },
    {
      title: "类型",
      dataIndex: "taskType",
    },
    {
      title: "状态",
      dataIndex: "taskState",
      width: "120px",
      slots: { customRender: "status" },
    },
    {
      title: "执行人",
      ellipsis: true,
      dataIndex: "assignorNames",
    },
    {
      title: "提交时间",
      dataIndex: "createTime",
    },
    {
      title: "操作",
      dataIndex: "operation",
      slots: { customRender: "operation" },
    },
  ]);
  const searchColumns = ref<ISearch[]>([
    {
      id: "taskType",
      label: "任务类型",
      valueType: "select",
      valueEnum: [
        {
          value: "",
          label: "全部",
        },
        ...TASK_TYPE_LIST,
      ],
    },
    {
      label: "任务名称",
      id: "taskName",
      valueType: "input",
    },
    {
      label: "生效日期",
      id: "publishTime",
      format: "YYYY-MM-DD hh:mm:ss",
      valueType: "date",
    },
    {
      label: "状态",
      id: "taskState",
      valueType: "select",
      valueEnum: [
        {
          value: "",
          label: "全部",
        },
        ...TASK_STATUS_LIST,
      ],
    },
    {
      label: "执行人",
      id: "assignorId",
      valueType: "input",
    },
    {
      label: "任务序号",
      id: "id",
      valueType: "input",
    },
  ]);
  return {
    columns,
    searchColumns,
  };
}
