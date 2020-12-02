<template>
  <a-layout id="layout">
    <!-- 侧边栏 -->
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <h1>{{ Config.title }}</h1>
      <LayoutMenus />
    </a-layout-sider>

    <a-layout>
      <!-- 头部 -->
      <a-layout-header class="layout__header">
        <MenuFoldOutlined
          :class="['trigger__btn', collapsed && 'trigger__btn--expand']"
          @click="handleClickTrigger"
        />
        <LayoutHeader />
      </a-layout-header>
      <!-- 主体内容 -->
      <a-layout-content class="layout__content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { defineComponent } from "vue";

import { MenuFoldOutlined } from "@ant-design/icons-vue";
import LayoutMenus from "./components/Menu";
import LayoutHeader from "./components/Header";

export default defineComponent({
  components: {
    LayoutMenus,
    LayoutHeader,
    MenuFoldOutlined,
  },
  inject: ["Config"],
  provide: ["collapsed"],
  computed: {},
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    handleClickTrigger() {
      this.collapsed = !this.collapsed;
    },
  },
});
</script>
<style lang="less" scoped>
@import "@/less/main.less";

#layout {
  width: 100%;
  height: 100vh;
  min-width: 1000px;
  // 布局 --- 头部样式
  .layout__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    background: #fff;
    .trigger__btn {
      font-size: 18px;
      cursor: pointer;
      transition: 0.3s;
      &--expand {
        transform: rotate(180deg);
      }
    }
  }
  // 布局 --- 侧边栏
  .layout-sider {
    overflow: "auto";
    height: "100vh";
    position: "fixed";
    left: 0;
    > h1 {
      background: #fff;
      width: 80%;
      text-align: center;
      margin: 20px auto;
      font-size: 18px;
      .ellipsis();
    }
  }
  // 布局 --- 主体内容
  .layout__content {
    min-height: 360px;
    padding: 15px;
    background: "#fff";
  }
}
</style>
