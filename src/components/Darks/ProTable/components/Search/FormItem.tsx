import { defineComponent } from "vue";
import FormItemTemplate from "../ValueType/index";

export default defineComponent({
  props: {
    columns: {
      type: Array,
      required: true,
    },
    // 搜索表单的组件属性 同 ant design vue 属性
    isCollapsed: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const { columns, isCollapsed } = props;

      return columns.map((column: any, index: number) => {
        const isRender = !isCollapsed ? index <= 1 : true;
        const _valueType = column.valueType || "default";
        const _formItemTemplate = (FormItemTemplate as any)[_valueType];
        if (!_formItemTemplate) return;
        const renderFn = _formItemTemplate["Search"];
        if (!renderFn) return "";
        return (
          isRender && (
            <a-form-item ref="name" key={index} label={column.title}>
              {renderFn(column)}
            </a-form-item>
          )
        );
      });
    };
  },
});
