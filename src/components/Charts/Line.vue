<script lang="tsx">
import { defineComponent, nextTick, PropType, ref, watch } from "vue";
import { Line, Options } from "@antv/g2plot";

export default defineComponent({
  name: "chart-line",
  props: {
    dataSource: {
      type: Array as PropType<Options["data"]>,
      required: false,
      default: () => [],
    },
    options: {
      type: Object as PropType<Options>,
      required: false,
      default: () => ({}),
    },
  },
  setup(props) {
    const chartRef = ref(); // chart 元素
    const chartInstance = ref();
    nextTick(() => {
      chartInstance.value = new Line(chartRef.value, {
        data: props["dataSource"],
        xField: "year",
        yField: "value",
      });
      chartInstance.value.render();
    });

    // 根据传入的 数据 渲染
    watch(
      () => props.dataSource,
      () => {
        chartInstance.value.changeData(props.dataSource);
      },
      {
        deep: true,
      },
    );

    return {
      chartInstance,
      chartRef,
    };
  },
  render() {
    return <div ref="chartRef"></div>;
  },
});
</script>

<style lang="less" scoped></style>
