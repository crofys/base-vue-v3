import AdminLayout from "@/layout/AdminLayout.vue";
import DefaultLayout from "@/layout/DefaultLayout.vue";


export const Routes = [
  {
    "path": "/",
    "name": "index",
    "component": DefaultLayout,
    "hidden": false,
    "children": [
      {
        "path": "/home/",
        "name": "home",
        "meta": {
          "title": "设置管理",
          "icon": "i-yonghu"
        },
        "component": AdminLayout,
        "children": [
          {
            "path": "/home",
            "name": "home-list",
            "meta": {
              "title": "首页",
              "icon": "i-yonghuliebiao"
            },
            "component": ()=> import(/* webpackChunkName: 'home-list' */ '@/views/Home/index.vue')
          }
        ]
      }
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
  "title": "智行和医管理平台",
  "iconUrl": "//at.alicdn.com/t/font_2208356_yexho0qvyoh.js"
};


