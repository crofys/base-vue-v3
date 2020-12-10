const INIT_STATE = {
  count: 0,
};

export const Store = {
  namespace: "home",
  state: INIT_STATE,
  mutations: {
    // 设置登陆信息
    SET_COUNT(state: any) {
      state.count = state.count + 1;
    },
  },
  actions: {
    addCount: ({ commit }: any) => {
      commit("SET_COUNT");
    },
  },
};
export default Store;
