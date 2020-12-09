import { defineComponent, reactive, toRaw } from "vue";
import { useForm } from "@ant-design-vue/use";
import { UpOutlined, DownOutlined } from "@ant-design/icons-vue";
import FormItemTemplate from "../ValueType/index";

import "./index.less";

export default defineComponent({
  props: {
    modelValue: Object,
    searchColumns: Array,
    onSearch: {
      type: Function,
      required: false,
    },
    // 是否现实展开收起按钮
    isShowColspan: {
      type: Boolean,
      required: false,
      default: true,
    },
    // 搜索表单的组件属性 同 ant design vue属性
    formProps: {
      type: Object,
      required: false,
    },
    // 搜索项 布局
    layout: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      collapsed: true, // true 展开 ；false 收起
    };
  },
  setup(props, context) {
    const formRef: any = reactive(props.modelValue || {});
    const rulesRef: any = reactive({});

    props.searchColumns?.map((search: any) => {
      if (search.rules && Array.isArray((rulesRef[search.id] = search.rules))) {
        rulesRef[search.id] = search.rules;
      }
    });
    const { resetFields, validate, validateInfos } = useForm(formRef, rulesRef);
    const onSubmit = (e: Event) => {
      e.preventDefault();

      validate()
        .then(() => {
          if (props.onSearch) props.onSearch(formRef);
          context.emit("update:modelValue", formRef);
          console.log("搜索参数", formRef, toRaw(formRef));
        })
        .catch(err => {
          console.log("error", err);
        });
    };
    return {
      formRef,
      validate,
      validateInfos,
      resetFields,
      onSubmit,
    };
  },

  methods: {
    handleClickTriggerSearchBar() {
      this.collapsed = !this.collapsed;
    },
    filterSearchProps() {
      const { layout, formProps } = this.$props;
      const _layout = layout || {
        sm: 24,
        md: 12,
        lg: 12,
        xl: 8,
        xxl: 6,
      };
      const _formsProps = Object.assign(
        {
          labelCol: {
            xxl: { span: 5, offset: 2 },
            xl: { span: 5, offset: 2 },
            lg: { span: 5, offset: 2 },
            md: { span: 7, offset: 2 },
            sm: { span: 5, offset: 2 },
          },
          wrapperCol: {
            xxl: { span: 17 },
            xl: { span: 17 },
            lg: { span: 17 },
            md: { span: 14 },
            sm: { span: 17 },
          },
          labelAlign: "left",
        },
        formProps,
      );

      return {
        _formsProps,
        _layout,
      };
    },
  },

  render() {
    const { _formsProps, _layout } = this.filterSearchProps();
    const { isShowColspan } = this.$props;
    const { collapsed } = this.$data;
    const { formRef, searchColumns } = this;
    const isRenderLayout = !!searchColumns?.length;
    return (
      isRenderLayout && (
        <a-form model={formRef} layout="inline" {..._formsProps}>
          <a-row class="search-warp">
            {searchColumns?.map((item: any, index: number) => {
              const isRender = !collapsed ? index <= 1 : true;
              const _valueType = item.valueType || "default";
              const _formItemTemplate = (FormItemTemplate as any)[_valueType];

              if (!_formItemTemplate) return;

              const Item = _formItemTemplate["Search"];

              return (
                isRender && (
                  <a-col {..._layout} key={item.dataIndex}>
                    <a-form-item label={item.title} {..._formsProps}>
                      <Item
                        {...item}
                        value={formRef[item.dataIndex]}
                        change={(val: any) => {
                          formRef[item.dataIndex] = val;
                        }}
                      />
                    </a-form-item>
                  </a-col>
                )
              );
            })}
            {this.$slots.btn ? (
              this.$slots.btn({ onSubmit: this.onSubmit })
            ) : (
              <a-col {..._layout}>
                <a-space
                  size={10}
                  style={{ display: "flex", "justify-content": "flex-end" }}
                >
                  <a-button type="primary" onClick={this.onSubmit}>
                    确定
                  </a-button>
                  <a-button type="primary" onClick={this.resetFields}>
                    重置
                  </a-button>
                  <a-button
                    type="link"
                    onClick={this.handleClickTriggerSearchBar}
                  >
                    {isShowColspan &&
                      (collapsed ? (
                        <>
                          收起
                          <UpOutlined />
                        </>
                      ) : (
                        <>
                          展开
                          <DownOutlined />
                        </>
                      ))}
                  </a-button>
                </a-space>
              </a-col>
            )}
          </a-row>
        </a-form>
      )
    );
  },
});
