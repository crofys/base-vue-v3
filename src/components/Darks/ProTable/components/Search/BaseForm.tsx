import { defineComponent, PropType, ref } from "vue";
import RenderComponents from "./RenderComponents";

export default defineComponent({
  props: {
    columns: {
      type: Array as PropType<any[]>,
      default: () => [],
      required: true,
    },
    model: {
      type: Object as PropType<any>,
      default: () => ({}),
      required: true,
    },
    onSubmit: {
      type: Function,
      required: false,
    },
  },
  setup(props) {
    const formRef = ref(null);
    return () => {
      const { columns, model, ..._props } = props;
      return (
        <a-form ref={formRef.value} model={model} {..._props}>
          {columns.map(({ type, key, label, ...column }) => {
            const renderFn = (RenderComponents as any)[type];
            if (!renderFn) return "";
            return (
              <a-form-item ref="name" label={label} key={key}>
                {renderFn(column)}
              </a-form-item>
            );
          })}
        </a-form>
      );
    };
  },
});
