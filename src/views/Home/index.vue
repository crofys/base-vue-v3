<script lang="tsx">
import { defineComponent, PropType, reactive, ref } from "vue";
import Line from "@/components/Charts/Line.vue";
import Bar from "@/components/Charts/Bar.vue";
const useCount = () => {
  const count = ref(0);
  const addCount = () => {
    count.value++;
  };
  return {
    count,
    addCount,
  };
};

const TabConatiner = defineComponent({
  props: {
    columns: {
      type: Array as PropType<Record<string, any>[]>,
      require: true,
      default: () => [],
    },
    onChange: Function as PropType<(...args: any[]) => void>,
  },
  setup(props, { emit }) {
    return () => (
      <a-tabs onChange={(...args: any[]) => emit("change", ...args)}>
        {() =>
          props.columns.map(tab => (
            <a-tab-pane key={tab.id} tab={tab.label}>
              <tab.components />
            </a-tab-pane>
          ))
        }
      </a-tabs>
    );
  },
});
export default defineComponent({
  components: { Line, Bar },
  setup() {
    const countState = useCount();

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
    const tabsList = [
      {
        id: "1",
        data: "lineData",
        label: "切换页1",
        components: <Line data-source={state.lineData} />,
      },
      {
        id: "2",
        data: "barData",
        label: "切换页2",
        components: <Bar data-source={state.barData} />,
      },
      {
        id: "3",
        data: "lineData",
        label: "切换页3",
        components: <Line data-source={state.lineData} />,
      },
      {
        id: "4",
        label: "切换页4",
        data: "barData",
        components: <Bar data-source={state.barData} />,
      },
    ];
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
      ...countState,
      state,
      tabsList,
      fetchApi,
    };
  },
  data() {
    return {};
  },
  methods: {
    changeData() {
      this.fetchApi();
    },
    handleTabSwitch() {
      this.fetchApi();
    },
  },
  render() {
    const { count, tabsList, addCount, handleTabSwitch, changeData } = this;
    return (
      <div>
        <p>{count}</p>
        <a-button onClick={addCount}>点击</a-button>
        <a-button onClick={changeData}>修改数据</a-button>
        <div>
          <TabConatiner columns={tabsList} onChange={handleTabSwitch} />
        </div>
      </div>
    );
  },
});
</script>

<style lang="less" scoped>
.line-wrap {
  width: 300px;
  height: 300px;
}
</style>
