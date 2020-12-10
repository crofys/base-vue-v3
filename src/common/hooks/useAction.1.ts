import { useStore } from "vuex";

type TUseAction = (
  namespace: string,
  actions: string[],
) => ((payload?: any) => Promise<any>)[];

export const useAction: TUseAction = (namespace, actions) => {
  const store = useStore();

  return actions.map(action => payload =>
    store.dispatch(`${namespace}/${action}`, payload),
  );
};
