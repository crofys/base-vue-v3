<script lang="tsx">
import { defineComponent, nextTick, PropType, ref, watch } from "vue";
import { Line, Options } from "@antv/g2plot";

export default defineComponent({
  name: "chart-line",
  props: {
    dataSource: {
      type: Array as PropType<Options["data"]>,
      required: true,
      default: () => [],
    },
  },
  setup(props) {
    const chartRef = ref();
    const chartInstance = ref();
    nextTick(() => {
      chartInstance.value = new Line(chartRef.value, {
        data: props["dataSource"],
        xField: "year",
        yField: "value",
      });
      chartInstance.value.render();
    });
    watch(
      props,
      () => {
        chartInstance.value.changeData(props.dataSource);
      },
      {
        // immediate: true,
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
