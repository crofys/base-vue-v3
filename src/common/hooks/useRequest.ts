import { ref, watch, Ref } from "vue";

type TUseRequest = (
  fn: (parma?: any) => Promise<any>,
  option?: {
    deps?: any[];
    immediate?: boolean;
    formatResult?: (res: any) => any;
    onSuccess?: (res: any) => void;
    onError?: (res: any) => void;
  },
) => {
  data: any;
  loading: Ref<boolean>;
  run: () => Promise<void>;
};

export const useRequest: TUseRequest = (fn, options) => {
  const loading = ref(false);
  const data = ref<any>(null);
  const { deps = [], formatResult, onSuccess, onError, immediate = true } =
    options || {};

  const run = async (...args: any[]) => {
    if (loading.value) return;
    try {
      loading.value = true;
      let res = await fn(...args);

      if (typeof formatResult === "function") {
        res = formatResult(res);
      }
      data.value = res;
      onSuccess && onSuccess(res);
    } catch (error) {
      console.log("接口请求失败：", error);
      onError && onError(error);
    }
    loading.value = false;
  };

  watch(deps, run, { immediate });

  return {
    loading,
    data,
    run,
  };
};
