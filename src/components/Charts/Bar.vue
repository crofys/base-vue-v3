<script lang="tsx">
import { defineComponent, nextTick, PropType, ref, watch } from "vue";
import { Bar, Options } from "@antv/g2plot";

export default defineComponent({
  name: "chart-bar",
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
      chartInstance.value = new Bar(chartRef.value, {
        data: props["dataSource"],
        xField: "value",
        yField: "year",
        seriesField: "year",
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
