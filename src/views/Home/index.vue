<template>
  <div>
    <p>{{ count }}</p>
    <a-button @click="addCount">点击</a-button>
    <!-- <ProTable></ProTable> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAction, useState } from "@/common/hooks";

export default defineComponent({
  setup() {
    const [addCount] = useAction("home", ["addCount"]);
    const count = useState("home", state => state.count);
    return {
      count,
      addCount,
    };
  },
});
</script>

<style lang="less"></style>
