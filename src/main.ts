import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import store from "./store";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import { Routes, Config } from "@dark/config";

import DarkComponents from "./components/Darks";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: Routes,
});

const app = createApp(App)
  .use(store)
  .use(router)
  .use(Antd);

DarkComponents.map((item: any) => {
  app.component(item.name, item.component);
});

// 挂在全局属性
app.config.globalProperties.$config = Config;

app.mount("#app");
