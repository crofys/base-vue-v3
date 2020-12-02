// import { reactive, toRefs } from "vue";

import { useInitState } from "./initState";

export function useService() {
  const initState = useInitState();
  return {
    ...initState,
  };
}
