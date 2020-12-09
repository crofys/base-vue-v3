"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var local_1 = require("@/utils/local");
var config_1 = require("@config/config");
var vuex_1 = require("vuex");
var lodash_1 = require("lodash");
var LOCAL_USER_KEY = config_1.Config.name + "_USER";
var INIT_USERS = {
    username: "admin",
    password: "",
    isLogin: "admin",
    remember: false
};
var INIT_STATE = {
    users: local_1.Local.get(LOCAL_USER_KEY) || INIT_USERS
};
exports["default"] = vuex_1.createStore({
    state: INIT_STATE,
    mutations: {
        // 设置登陆信息
        SET_USERS: function (state, payload) {
            state.users = lodash_1.merge({}, state.users, payload);
            local_1.Local.set(LOCAL_USER_KEY, state.users);
        }
    },
    actions: {
        login: function (_a, params) {
            var commit = _a.commit;
            commit("SET_USERS", __assign(__assign({}, params), { isLogin: true }));
        },
        loginOut: function (_a) {
            var commit = _a.commit;
            commit("SET_USERS", {
                isLogin: false
            });
            window.location.href = "/login";
        }
    }
});
