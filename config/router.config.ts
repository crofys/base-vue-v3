import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/common/layout/BaseLayout.vue";
import BaseDefaultLayout from "@/common/layout/BaseDefaultLayout.vue";

export const routes = [
  {
    path: "/",
    name: "index",
    component: Layout,
    hidden: false,
    children: [
      {
        path: "/user/",
        name: "user",
        meta: {
          title: "用户管理",
          icon: "i-yonghu",
        },
        component: BaseDefaultLayout,
        children: [
          // 人员管理 - 列表
          {
            path: "/user/list",
            name: "user-list",
            meta: {
              title: "用户列表",
              icon: "i-yonghuliebiao",
            },
            component: () =>
              import(
                /* webpackChunkName: "user-list" */ "@/views/User/List/index.vue"
              ),
          },
          // 人员管理 - 详情
          {
            path: "/user/:id",
            name: "user-detail",
            component: () =>
              import(
                /* webpackChunkName: "user-detail" */ "@/views/User/Detail/index.vue"
              ),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
