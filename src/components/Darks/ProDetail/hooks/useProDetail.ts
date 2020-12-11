import { reactive } from "vue";
import { IColumns } from "../types";
import { useRequest } from "@/common/hooks";

interface IUseProDetail {
  columns: IColumns[];
  request: (params: any) => any;
  formatResult?: (res: any) => any;
}

export const useProDetail = (options: IUseProDetail) => {
  const { request, formatResult, columns } = reactive(options);
  const _options = reactive({
    columns,
    loading: true,
    dataSource: {},
  });

  useRequest(request, {
    formatResult,
    onSuccess(res) {
      _options.loading = false;
      _options.dataSource = res;
    },
  });

  return _options;
};
