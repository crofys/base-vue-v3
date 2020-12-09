<template>
  <div class="header">
    <a-dropdown>
      <a class="ant-dropdown-link" @click="e => e.preventDefault()">
        Admin
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item class="menu-item">
            <div><LoginOutlined /> <span>退出</span></div>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts">
import { LoginOutlined } from "@ant-design/icons-vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LayoutHeader",
  components: { LoginOutlined },
  props: {},
});
</script>

<style lang="less" scoped>
.menu-item {
  padding: 5px 20px;
}
</style>
