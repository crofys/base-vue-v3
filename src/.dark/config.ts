import AdminLayout from "@/layout/AdminLayout.vue";
import DefaultLayout from "@/layout/DefaultLayout.vue";


export const Routes = [
  {
    "path": "/",
    "name": "index",
    "component": AdminLayout,
    "children": [
      {
        "path": "/home",
        "name": "home",
        "meta": {
          "title": "首页"
        },
        "component": ()=> import(/* webpackChunkName: 'home' */ '@/views/Home/index.tsx')
      },
      {
        "path": "/list",
        "name": "list",
        "meta": {
          "title": "列表"
        },
        "component": ()=> import(/* webpackChunkName: 'list' */ '@/views/List/index.vue')
      },
    ]
  },
  {
    "path": "/login",
    "name": "login",
    "component": ()=> import(/* webpackChunkName: 'login' */ '@/views/Login/index.vue')
  }
];

export const Config = {
  "name": "ZH_ADMIN",
  "title": "基础项目",
  "iconUrl": "//at.alicdn.com/t/font_2208356_yexho0qvyoh.js",
  "menus": {
    "theme": "dark"
  }
};


