import { App, toRefs, reactive } from "vue";

let __Vue__: App;
let __Store__: any;

export const useStore = () => {
  console.log(__Vue__, "====Vue");

  return {
    ...toRefs(__Store__?.state),
  };
};
export const dispatch = (name: any, value: any) => {
  console.log(__Store__, "===__Store__");
  __Store__.state = __Store__["action"][name]({ state: __Store__.state });
  console.log(value);
};
export class Store {}

export const createStore = (_store: any) => {
  _store.state = reactive(_store.state);

  __Store__ = _store;
  return _store;
};

function install(_Vue: App) {
  __Vue__ = _Vue;
}

export default { install };
