import { Local } from "@/utils/local";
import Config from "../config/config";
import { createStore } from "vuex";
import { merge } from "lodash";

const LOCAL_USER_KEY = Config.name + "_USER";
const INIT_USERS = {
  username: "admin",
  password: "",
  isLogin: "admin",
  remember: false,
};
const INIT_STATE = {
  users: Local.get(LOCAL_USER_KEY) || INIT_USERS,
};

export default createStore({
  state: INIT_STATE,
  mutations: {
    // 设置登陆信息
    SET_USERS(state, payload) {
      state.users = merge({}, state.users, payload);
      Local.set(LOCAL_USER_KEY, state.users);
    },
  },
  actions: {
    login: ({ commit }, params) => {
      commit("SET_USERS", {
        ...params,
        isLogin: true,
      });
    },
    loginOut: ({ commit }) => {
      commit("SET_USERS", {
        isLogin: false,
      });
      window.location.href = "/login";
    },
  },
});
