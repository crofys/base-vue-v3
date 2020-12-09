import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import store from "./store";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
<<<<<<< HEAD
=======
import ProTable from "@/components/ProTable";
import ModalForm from "@/components/ModalForm";
import ProSelect from "@/components/ProSelect";
import ProRadio from "@/components/ProRadio";
import ProEllipsis from "@/components/Ellipsis";
import ProDetail from "@/components/ProDetail";
// import "@/mock";
import { createFromIconfontCN } from "@ant-design/icons-vue";
import { Routes, Config } from "@dark/config";
>>>>>>> e5b6dee23c22c94f272e05c265213447edc4c17c

import { GlobalComponents } from "./components/Global";

// import "@/mock";
import Config from "@/config/config";
import stores from "@/common/core/store";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: Routes,
});
const app = createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
  .use(stores);

GlobalComponents.map((item: any) => {
  app.component(item.name, item.component);
});

// 挂在全局属性
app.config.globalProperties.$config = Config;

app.mount("#app");
