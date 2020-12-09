import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import store from "./store";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import ProTable from "@/components/ProTable";
import ModalForm from "@/components/ModalForm";
import ProSelect from "@/components/ProSelect";
import ProRadio from "@/components/ProRadio";
import ProEllipsis from "@/components/Ellipsis";
import ProDetail from "@/components/ProDetail";
// import "@/mock";
import { createFromIconfontCN } from "@ant-design/icons-vue";
import { Routes, Config } from "@dark/config";

const IconFont = createFromIconfontCN({
  scriptUrl: Config.iconUrl,
});

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

app.component("ProTable", ProTable);
app.component("ProSelect", ProSelect);
app.component("ProRadio", ProRadio);
app.component("ProEllipsis", ProEllipsis);
app.component("ProDetail", ProDetail);
app.component("IconFont", IconFont as any);
app.component("ModalForm", ModalForm);

// 挂在全局属性
app.config.globalProperties.$config = Config;

app.mount("#app");
