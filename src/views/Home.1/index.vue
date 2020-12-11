<template>
  <div>
    <p>{{ count }}</p>
    <a-button @click="addCount">点击</a-button>
    <a-button @click="changeData">修改数据</a-button>
    <div>
      <a-tabs @change="handleTabSwitch">
        <a-tab-pane key="1" tab="Tab 1">
          <Line :data-source="state.lineData" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Tab 2">
          <Bar :data-source="state.barData" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Tab 3">
          <Bar :data-source="state.barData" />
        </a-tab-pane>
        <a-tab-pane key="4" tab="Tab 4">
          <Bar :data-source="state.barData" />
        </a-tab-pane>
        <a-tab-pane key="5" tab="Tab 5">
          <Bar :data-source="state.barData" />
        </a-tab-pane>
        <a-tab-pane key="6" tab="Tab 6">
          <Bar :data-source="state.barData" />
        </a-tab-pane>
      </a-tabs>
    </div>

    <!-- <ProTable></ProTable> -->
  </div>
</template>

<script lang="tsx">
import { defineComponent, reactive } from "vue";
import { useAction, useState } from "@/common/hooks";
import Line from "@/components/Charts/Line.vue";
import Bar from "@/components/Charts/Bar.vue";
export default defineComponent({
  components: { Line, Bar },
  data() {
    return {
      lineData: [
        { year: "4444 年", value: 38 },
        { year: "444 年", value: 52 },
        { year: "33 年", value: 61 },
        { year: "19357 年", value: 145 },
        { year: "222 年", value: 48 },
      ],
      barData: [
        { year: "1951 年", value: 38 },
        { year: "1952 年", value: 52 },
        { year: "1956 年", value: 61 },
        { year: "1957 年", value: 145 },
        { year: "1958 年", value: 48 },
      ],
    };
  },
  setup() {
    const [addCount] = useAction("home", ["addCount"]);
    const count = useState("home", state => state.count);
    const state = reactive({
      lineData: [
        { year: "4444 年", value: 38 },
        { year: "444 年", value: 52 },
        { year: "33 年", value: 61 },
        { year: "19357 年", value: 145 },
        { year: "222 年", value: 48 },
      ],
      barData: [
        { year: "1951 年", value: 38 },
        { year: "1952 年", value: 52 },
        { year: "1956 年", value: 61 },
        { year: "1957 年", value: 145 },
        { year: "1958 年", value: 48 },
      ],
    });

    const fetchApi = () => {
      state.lineData = state.lineData.map(k => ({
        ...k,
        value: Math.random() * 100,
      }));
      state.barData = state.barData.map(k => ({
        ...k,
        value: Math.random() * 100,
      }));
    };
    return {
      count,
      addCount,
      state,
      fetchApi,
    };
  },
  methods: {
    changeData() {
      this.fetchApi();
    },
    handleTabSwitch() {
      this.fetchApi();
    },
  },
});
</script>

<style lang="less" scoped>
.line-wrap {
  width: 300px;
  height: 300px;
}
</style>
