import { ref } from "vue";
import { ISearch } from "@/components/Search/interface";

export function useInitState() {
  const columns = ref([
    {
      title: "用户ID",
      dataIndex: "id",
    },
    {
      title: "用户电话",
      dataIndex: "phone",
    },
    {
      title: "用户昵称",
      dataIndex: "name",
    },
  ]);
  const searchColumns = ref<ISearch[]>([
    {
      id: "phone",
      label: "用户手机",
      width: "120px",
      valueType: "input",
    },
    {
      id: "name",
      label: "用户昵称",
      width: "120px",
      valueType: "input",
    },
    {
      label: "用户ID",
      id: "id",
      width: "120px",
      valueType: "input",
    },
  ]);
  return {
    columns,
    searchColumns,
  };
}

export function useService() {
  const initState = useInitState();
  return {
    ...initState,
  };
}
