<template>
  <config-provider :locale="locale">
    <router-view></router-view>
  </config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ConfigProvider } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";

export default defineComponent({
  components: { ConfigProvider },
  data() {
    return {
      locale: zhCN,
    };
  },
  setup() {
    // 将项目Config配置信息 全局注册到组件中
  },
});
</script>

<style></style>
