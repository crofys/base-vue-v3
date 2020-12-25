<script lang="tsx">
import { ref, defineComponent, nextTick, PropType, watch } from "vue";
import { EChartsOption, init } from "echarts";

export default defineComponent({
  name: "chart-base",
  props: {
    dataSource: {
      type: Array as PropType<EChartsOption["series"]>,
      required: false,
      default: () => [],
    },
    options: {
      type: Object as PropType<EChartsOption>,
      required: false,
      default: () =>
        ({
          legend: {},
          tooltip: {
            // axisPointer: {
            //   type: "cross",
            //   label: {
            //     backgroundColor: "#6a7985",
            //   },
            // },
          },
          dataset: {
            // 用 dimensions 指定了维度的顺序。直角坐标系中，
            // 默认把第一个维度映射到 X 轴上，第二个维度映射到 Y 轴上。
            // 如果不指定 dimensions，也可以通过指定 series.encode
            // 完成映射，参见后文。
            dimensions: ["minute", "live", "vod"],
            source: [
              {
                vod: "0.064041",
                attribute: "family",
                live: "0.013503",
                minute: "00:00:00",
              },
              {
                vod: "0.063703",
                attribute: "family",
                live: "0.013325",
                minute: "00:01:00",
              },
              {
                vod: "0.063360",
                attribute: "family",
                live: "0.013148",
                minute: "00:02:00",
              },
              {
                vod: "0.063013",
                attribute: "family",
                live: "0.012974",
                minute: "00:03:00",
              },
              {
                vod: "0.062661",
                attribute: "family",
                live: "0.012801",
                minute: "00:04:00",
              },
              {
                vod: "0.062305",
                attribute: "family",
                live: "0.012630",
                minute: "00:05:00",
              },
              {
                vod: "0.061946",
                attribute: "family",
                live: "0.012461",
                minute: "00:06:00",
              },
              {
                vod: "0.061582",
                attribute: "family",
                live: "0.012295",
                minute: "00:07:00",
              },
              {
                vod: "0.061215",
                attribute: "family",
                live: "0.012130",
                minute: "00:08:00",
              },
              {
                vod: "0.060844",
                attribute: "family",
                live: "0.011967",
                minute: "00:09:00",
              },
              {
                vod: "0.060469",
                attribute: "family",
                live: "0.011806",
                minute: "00:10:00",
              },
              {
                vod: "0.060092",
                attribute: "family",
                live: "0.011647",
                minute: "00:11:00",
              },
              {
                vod: "0.059710",
                attribute: "family",
                live: "0.011490",
                minute: "00:12:00",
              },
              {
                vod: "0.059326",
                attribute: "family",
                live: "0.011335",
                minute: "00:13:00",
              },
              {
                vod: "0.058939",
                attribute: "family",
                live: "0.011181",
                minute: "00:14:00",
              },
              {
                vod: "0.058549",
                attribute: "family",
                live: "0.011030",
                minute: "00:15:00",
              },
              {
                vod: "0.058157",
                attribute: "family",
                live: "0.010881",
                minute: "00:16:00",
              },
              {
                vod: "0.057762",
                attribute: "family",
                live: "0.010734",
                minute: "00:17:00",
              },
              {
                vod: "0.057364",
                attribute: "family",
                live: "0.010588",
                minute: "00:18:00",
              },
              {
                vod: "0.056964",
                attribute: "family",
                live: "0.010445",
                minute: "00:19:00",
              },
              {
                vod: "0.056562",
                attribute: "family",
                live: "0.010303",
                minute: "00:20:00",
              },
              {
                vod: "0.056158",
                attribute: "family",
                live: "0.010164",
                minute: "00:21:00",
              },
              {
                vod: "0.055752",
                attribute: "family",
                live: "0.010026",
                minute: "00:22:00",
              },
              {
                vod: "0.055344",
                attribute: "family",
                live: "0.009890",
                minute: "00:23:00",
              },
              {
                vod: "0.054935",
                attribute: "family",
                live: "0.009757",
                minute: "00:24:00",
              },
              {
                vod: "0.054524",
                attribute: "family",
                live: "0.009625",
                minute: "00:25:00",
              },
              {
                vod: "0.054111",
                attribute: "family",
                live: "0.009495",
                minute: "00:26:00",
              },
              {
                vod: "0.053698",
                attribute: "family",
                live: "0.009367",
                minute: "00:27:00",
              },
              {
                vod: "0.053283",
                attribute: "family",
                live: "0.009241",
                minute: "00:28:00",
              },
              {
                vod: "0.052867",
                attribute: "family",
                live: "0.009117",
                minute: "00:29:00",
              },
              {
                vod: "0.052532",
                attribute: "family",
                live: "0.009007",
                minute: "00:30:00",
              },
              {
                vod: "0.052198",
                attribute: "family",
                live: "0.008899",
                minute: "00:31:00",
              },
              {
                vod: "0.051864",
                attribute: "family",
                live: "0.008793",
                minute: "00:32:00",
              },
              {
                vod: "0.051530",
                attribute: "family",
                live: "0.008689",
                minute: "00:33:00",
              },
              {
                vod: "0.051197",
                attribute: "family",
                live: "0.008587",
                minute: "00:34:00",
              },
              {
                vod: "0.050865",
                attribute: "family",
                live: "0.008486",
                minute: "00:35:00",
              },
              {
                vod: "0.050534",
                attribute: "family",
                live: "0.008388",
                minute: "00:36:00",
              },
              {
                vod: "0.050203",
                attribute: "family",
                live: "0.008291",
                minute: "00:37:00",
              },
              {
                vod: "0.049873",
                attribute: "family",
                live: "0.008196",
                minute: "00:38:00",
              },
              {
                vod: "0.049544",
                attribute: "family",
                live: "0.008103",
                minute: "00:39:00",
              },
              {
                vod: "0.049217",
                attribute: "family",
                live: "0.008011",
                minute: "00:40:00",
              },
              {
                vod: "0.048883",
                attribute: "family",
                live: "0.007906",
                minute: "00:41:00",
              },
              {
                vod: "0.048551",
                attribute: "family",
                live: "0.007803",
                minute: "00:42:00",
              },
              {
                vod: "0.048220",
                attribute: "family",
                live: "0.007701",
                minute: "00:43:00",
              },
              {
                vod: "0.047890",
                attribute: "family",
                live: "0.007602",
                minute: "00:44:00",
              },
              {
                vod: "0.047544",
                attribute: "family",
                live: "0.007505",
                minute: "00:45:00",
              },
              {
                vod: "0.047200",
                attribute: "family",
                live: "0.007410",
                minute: "00:46:00",
              },
              {
                vod: "0.046858",
                attribute: "family",
                live: "0.007317",
                minute: "00:47:00",
              },
              {
                vod: "0.046518",
                attribute: "family",
                live: "0.007226",
                minute: "00:48:00",
              },
              {
                vod: "0.046180",
                attribute: "family",
                live: "0.007137",
                minute: "00:49:00",
              },
              {
                vod: "0.045845",
                attribute: "family",
                live: "0.007050",
                minute: "00:50:00",
              },
              {
                vod: "0.045511",
                attribute: "family",
                live: "0.006964",
                minute: "00:51:00",
              },
              {
                vod: "0.045180",
                attribute: "family",
                live: "0.006881",
                minute: "00:52:00",
              },
              {
                vod: "0.044851",
                attribute: "family",
                live: "0.006800",
                minute: "00:53:00",
              },
              {
                vod: "0.044525",
                attribute: "family",
                live: "0.006720",
                minute: "00:54:00",
              },
              {
                vod: "0.044200",
                attribute: "family",
                live: "0.006643",
                minute: "00:55:00",
              },
              {
                vod: "0.043879",
                attribute: "family",
                live: "0.006567",
                minute: "00:56:00",
              },
              {
                vod: "0.043560",
                attribute: "family",
                live: "0.006493",
                minute: "00:57:00",
              },
              {
                vod: "0.043243",
                attribute: "family",
                live: "0.006420",
                minute: "00:58:00",
              },
              {
                vod: "0.042929",
                attribute: "family",
                live: "0.006350",
                minute: "00:59:00",
              },
              {
                vod: "0.042656",
                attribute: "family",
                live: "0.006287",
                minute: "01:00:00",
              },
              {
                vod: "0.042382",
                attribute: "family",
                live: "0.006224",
                minute: "01:01:00",
              },
              {
                vod: "0.042106",
                attribute: "family",
                live: "0.006162",
                minute: "01:02:00",
              },
              {
                vod: "0.041828",
                attribute: "family",
                live: "0.006100",
                minute: "01:03:00",
              },
              {
                vod: "0.041549",
                attribute: "family",
                live: "0.006039",
                minute: "01:04:00",
              },
              {
                vod: "0.041268",
                attribute: "family",
                live: "0.005977",
                minute: "01:05:00",
              },
              {
                vod: "0.040986",
                attribute: "family",
                live: "0.005917",
                minute: "01:06:00",
              },
              {
                vod: "0.040702",
                attribute: "family",
                live: "0.005856",
                minute: "01:07:00",
              },
              {
                vod: "0.040417",
                attribute: "family",
                live: "0.005796",
                minute: "01:08:00",
              },
              {
                vod: "0.040130",
                attribute: "family",
                live: "0.005737",
                minute: "01:09:00",
              },
              {
                vod: "0.039834",
                attribute: "family",
                live: "0.005678",
                minute: "01:10:00",
              },
              {
                vod: "0.039537",
                attribute: "family",
                live: "0.005619",
                minute: "01:11:00",
              },
              {
                vod: "0.039238",
                attribute: "family",
                live: "0.005560",
                minute: "01:12:00",
              },
              {
                vod: "0.038938",
                attribute: "family",
                live: "0.005502",
                minute: "01:13:00",
              },
              {
                vod: "0.038637",
                attribute: "family",
                live: "0.005445",
                minute: "01:14:00",
              },
              {
                vod: "0.038335",
                attribute: "family",
                live: "0.005387",
                minute: "01:15:00",
              },
              {
                vod: "0.038031",
                attribute: "family",
                live: "0.005330",
                minute: "01:16:00",
              },
              {
                vod: "0.037727",
                attribute: "family",
                live: "0.005274",
                minute: "01:17:00",
              },
              {
                vod: "0.037421",
                attribute: "family",
                live: "0.005217",
                minute: "01:18:00",
              },
              {
                vod: "0.037114",
                attribute: "family",
                live: "0.005162",
                minute: "01:19:00",
              },
              {
                vod: "0.036806",
                attribute: "family",
                live: "0.005106",
                minute: "01:20:00",
              },
              {
                vod: "0.036498",
                attribute: "family",
                live: "0.005051",
                minute: "01:21:00",
              },
              {
                vod: "0.036188",
                attribute: "family",
                live: "0.004996",
                minute: "01:22:00",
              },
              {
                vod: "0.035877",
                attribute: "family",
                live: "0.004942",
                minute: "01:23:00",
              },
              {
                vod: "0.035566",
                attribute: "family",
                live: "0.004888",
                minute: "01:24:00",
              },
              {
                vod: "0.035254",
                attribute: "family",
                live: "0.004834",
                minute: "01:25:00",
              },
            ],
          },
          xAxis: [{ type: "category", boundaryGap: false }],
          yAxis: {},
          series: [
            { type: "line", areaStyle: {} },
            { type: "line", areaStyle: {} },
          ],
        } as EChartsOption),
    },
  },
  setup(props) {
    const chartRef = ref();
    const chartInstance = ref();
    nextTick(() => {
      chartInstance.value = init(chartRef.value, "", {
        width: 500,
        height: 500,
      });
      chartInstance.value.setOption(props.options);
    });

    // 根据传入的 数据 渲染
    watch(
      () => props.options,
      val => {
        if (chartInstance.value) {
          chartInstance.value.setOption(val);
        }
      },
      {
        deep: true,
      },
    );

    return { chartRef };
  },
  render() {
    return <div ref="chartRef"></div>;
  },
});
</script>

<style lang="less" scoped></style>
