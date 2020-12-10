import { useStore } from "vuex";
import { Store } from "@/views/Home/model";

type TActionNames = keyof typeof Store.actions;

type TUseAction = (
  namespace: string,
  actions: TActionNames[],
) => ((payload?: any) => Promise<any>)[];

export const useAction: TUseAction = (namespace, actions) => {
  const store = useStore();

  return actions.map(action => payload =>
    store.dispatch(`${namespace}/${action}`, payload),
  );
};
