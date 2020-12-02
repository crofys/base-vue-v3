import { defineComponent, reactive, toRaw } from "vue";
import { useForm } from "@ant-design-vue/use";
// import { FormItem } from "./FormItem";
import FormItemTemplate from "./components";

import "./index.less";

export default defineComponent({
  props: {
    modelValue: Object,
    searchColumns: Array,
    onSearch: {
      type: Function,
      required: false,
    },
    customLayout: {
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
  },

  render() {
    const { customLayout } = this.$props;
    const { collapsed } = this.$data;
    const { formRef } = this;
    const colProps = customLayout || {
      xs: 24,
      sm: 24,
      md: 12,
      lg: 12,
      xl: 8,
      xxl: 6,
    };
    // const colProps = customLayout || {
    //   xs: 24,
    //   sm: 24,
    //   md: 12,
    //   lg: 8,
    //   xl: 6,
    //   xxl: 6,
    // };

    return (
      <a-form model={formRef} layout="inline" labelAlign="left">
        <a-row class="search-warp">
          {this.searchColumns?.map((item: any, index: number) => {
            const isRender = !collapsed ? index == 0 : true;
            const Item = (FormItemTemplate as any)[item.valueType];

            return (
              isRender && (
                <a-col {...colProps} key={item.id}>
                  <a-form-item label={item.label}>
                    <Item
                      {...item}
                      value={formRef[item.id]}
                      change={(val: any) => {
                        formRef[item.id] = val;
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
            <a-col {...colProps} style="texAlign:right">
              <a-space size={10}>
                <a-button type="primary" onClick={this.onSubmit}>
                  确定
                </a-button>
                <a-button type="primary" onClick={this.resetFields}>
                  重置
                </a-button>
                <a-button
                  type="default"
                  onClick={this.handleClickTriggerSearchBar}
                >
                  {collapsed ? "收起" : "展开"}
                </a-button>
              </a-space>
            </a-col>
          )}
        </a-row>
      </a-form>
    );
  },
});
