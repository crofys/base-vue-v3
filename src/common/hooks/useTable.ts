import { cloneDeep } from "lodash";
import { reactive, Ref, ref } from "vue";
import { useRequest } from "./useRequest";

interface IUseTableOptionProps {
  columns: any[];
  formatResult?: (res: any) => { data: any; count?: any };
  onSuccess?: (res: any) => any;
}
type TUseTable = (
  fn: () => Promise<any>,
  options: IUseTableOptionProps,
) =>
  | any
  | {
      loading: Ref<boolean>;
      dataSource: any;
      columns: any[];
      run: () => Promise<void>;
    };

export const useTable: TUseTable = (fn, options: IUseTableOptionProps) => {
  const { columns, onSuccess, formatResult } = options;

  const dataSource = ref([]);
  const state = reactive({
    columns: cloneDeep(columns),
    total: 0,
    // dataSource: [] as any[],
  });

  const { run, loading } = useRequest(fn, {
    onSuccess(res) {
      const { data = [], count = 0 } = res;
      dataSource.value = data;
      state.total = count;

      console.log(state, "===state");
      console.log(dataSource, "===dataSource");
      onSuccess && onSuccess(res);
    },
    formatResult,
  });

  return {
    loading,
    run,
    dataSource,
  };
};
