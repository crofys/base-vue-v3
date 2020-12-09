import { defineComponent, toRaw, ref } from "vue";
import { useForm } from "@ant-design-vue/use";

export const BaseEdit = defineComponent({
  name: "BaseEdit",
  props: {
    name: {
      type: String,
      required: true,
    },
    rules: {
      type: Object,
      required: false,
    },
    model: {
      type: Object,
      required: true,
    },
    // 点击确定按钮回调事件 Promise对象
    onOk: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const loading = ref(false);
    const { resetFields, validate, validateInfos } = useForm(
      props.model,
      props.rules,
    );

    const onSubmit = async (e: any) => {
      e.preventDefault();
      if (loading.value) return;
      loading.value = true;
      try {
        await validate();
        if (props.onOk) {
          await props.onOk(toRaw(props.model));
        }
        // emit("submit", toRaw(props.model));
      } catch (error) {
        console.log("error", error);
      }
      loading.value = false;
    };

    return {
      loading,
      validateInfos,
      resetFields,
      onSubmit,
    };
  },
  methods: {
    /**
     * @description 处理slot插槽元素
     * @returns
     */
    formateSlotChildren() {
      const _slots = (this.$slots?.default as any)();

      for (const slot of _slots) {
        if (slot.type.name === "AFormItem") {
          Object.assign(slot.props, {
            ...this.validateInfos[slot.props.field],
          });
        }
      }
      return _slots;
    },
    /**
     * @description 取消 Click
     * @returns
     */
    handleClickCancel() {
      this.$router.go(-1);
    },
  },
  render() {
    const footerSlot = this.$slots.footer;
    const headerSlot = this.$slots.header;
    const { name } = this.$props;
    const formLayout = {
      labelAlign: "left",
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    return (
      <a-form model={this.$props.model} {...formLayout}>
        {/* Header 头部按钮 */}
        {headerSlot ? headerSlot() : <h1>新建{name}</h1>}

        {/* 主体内容 */}
        {this.formateSlotChildren()}

        {/* Footer 底部按钮 */}
        {footerSlot ? (
          footerSlot()
        ) : (
          <a-row type="flex" justify="center">
            <a-space size={10}>
              <a-button
                type="primary"
                loading={this.loading}
                onClick={this.onSubmit}
              >
                确定
              </a-button>
              <a-button onClick={this.handleClickCancel}>取消</a-button>
            </a-space>
          </a-row>
        )}
      </a-form>
    );
  },
});

export * from "./useRules";
