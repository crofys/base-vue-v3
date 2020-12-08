import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/BaseLayout.vue";
import BaseDefaultLayout from "@/layout/BaseDefaultLayout.vue";

export const routes = [
  {
    path: "/",
    name: "index",
    component: BaseDefaultLayout,
    hidden: false,
    children: [
      {
        path: "/home/",
        name: "home",
        meta: {
          title: "设置管理",
          icon: "i-yonghu",
        },
        component: Layout,
        children: [
          // 人员管理 - 列表
          {
            path: "/home",
            name: "home-list",
            meta: {
              title: "首页",
              icon: "i-yonghuliebiao",
            },
            component: () =>
              import(/* webpackChunkName: "home" */ "@/views/Home/index.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: import(
      /* webpackChunkName: "login" */ "@/views/Login/index.vue"
    ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
