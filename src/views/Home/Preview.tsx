import { defineComponent, reactive, ref } from "vue";
import BaseForm from "./components/BaseForm";
import { defineColumns } from "./libs/index";

export default defineComponent({
  setup() {
    const formRef = ref(null);
    const formModel = reactive({
      name: "张三",
    });

    const handleClickSubmit = () => {
      console.log(formRef, formModel);
    };

    const columns = [
      {
        type: "input",
        key: "name",
        label: "姓名",
        placeholder: "这是 name",
      },
      {
        type: "select",
        key: "name",
        label: "姓名",
        placeholder: "这是 name",
        options: [
          {
            label: "苹果",
            value: "apple",
            span: 12,
          },
          {
            label: "苹果1",
            value: "apple1",
            span: 12,
          },
        ],
      },
      {
        type: "checkbox",
        key: "checkbox",
        label: "复选",
        placeholder: "这是 复选",
        options: [
          {
            label: "苹果",
            value: "apple",
            span: 12,
          },
          {
            label: "苹果1",
            value: "apple1",
            span: 12,
          },
        ],
      },
      {
        type: "radio",
        key: "checkbox",
        label: "复选",
        placeholder: "这是 复选",
        options: [
          {
            label: "苹果",
            value: "apple",
            span: 12,
          },
          {
            label: "苹果1",
            value: "apple1",
            span: 12,
          },
        ],
      },
    ];

    const _columns = defineColumns(formModel, columns);

    return () => {
      return (
        <BaseForm
          columns={_columns}
          model={formModel}
          onSubmit={handleClickSubmit}
        ></BaseForm>
      );
    };
  },
});
