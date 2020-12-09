import { defineComponent, ref } from "vue";
// import { useForm } from "@ant-design-vue/use";

export default defineComponent({
  props: {
    onFinish: {
      type: Function,
      required: false,
    },
    model: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
      required: false,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      formLayout: { labelCol: { span: 4 }, wrapperCol: { span: 14 } },
    };
  },
  setup(props) {
    const formRef = ref();

    const handleClickOk = async () => {
      try {
        await formRef.value?.validate();
        const val = formRef.value?.getFieldsValue();
        console.log("表单参数", val);

        props?.onFinish && props?.onFinish(val);
      } catch (error) {
        console.log("表单提交失败", error);
      }
    };

    return { formRef, handleClickOk };
  },
  methods: {
    cancel() {
      this.$emit("update:visible", false);
    },
  },
  render() {
    const { model, rules, visible, ...props } = this.$props;
    // 扩展 ant modal 组件属性
    const modalProps = Object.assign(
      {
        visible,
        title: "新建",
        okText: "确认",
        cancelText: "取消",
        onOk: this.handleClickOk,
        onCancel: this.cancel,
        maskClosable: true,
      },
      props,
    );
    // 扩展 form 组件属性
    const formProps = Object.assign(this.formLayout, {
      model,
      rules,
    });

    return (
      <a-modal {...modalProps}>
        <a-form ref="formRef" {...formProps}>
          {this.$slots.default && this.$slots.default()}
        </a-form>
      </a-modal>
    );
  },
});
