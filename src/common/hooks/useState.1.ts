import { computed, ComputedRef } from "vue";
import { useStore } from "vuex";

type TUseState = <T = any, R = any>(
  namespace: string,
  fn: (state: T) => R,
) => ComputedRef<R>;

export const useState: TUseState = (namespace, fn) => {
  const store = useStore();
  const state = computed(() => fn(store.state[namespace]));
  return state;
};
