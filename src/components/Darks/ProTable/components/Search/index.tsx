import { defineComponent, PropType, reactive, ref, toRaw } from "vue";
import { useForm } from "@ant-design-vue/use";
import SearchBtn from "./SearchBtn";
import FormItem from "./FormItem";

import "./index.less";

const FormLayout = {
  sm: 24,
  md: 8,
  xxl: 6,
  layout: "inline",
};

export default defineComponent({
  props: {
    model: {
      type: Object as PropType<any>,
      default: () => ({}),
      required: true,
    },
    modelValue: Object,
    columns: {
      type: Array,
      required: true,
    },
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
    // 搜索表单的组件属性 同 ant design vue 属性
    formProps: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      collapsed: true, // true 展开 ；false 收起
    };
  },
  setup(props, { emit, slots }) {
    const formRef: any = reactive(props.modelValue || {});
    const rulesRef: any = reactive({});
    const collapsed = ref(true);

    props.columns?.map((search: any) => {
      if (search.rules && Array.isArray((rulesRef[search.id] = search.rules))) {
        rulesRef[search.id] = search.rules;
      }
    });
    const { resetFields, validate } = useForm(formRef, rulesRef);

    const onSubmit = (e: Event) => {
      e.preventDefault();

      validate()
        .then(() => {
          if (props.onSearch) props.onSearch(formRef);
          emit("update:modelValue", formRef);
          console.log("搜索参数", formRef, toRaw(formRef));
        })
        .catch(err => {
          console.log("error", err);
        });
    };

    const handleClickTriggerSearchBar = () => {
      collapsed.value = !collapsed.value;
    };

    return () => {
      const { columns, model } = props;
      const isRenderSearch = !!columns?.length;
      return (
        isRenderSearch && (
          <section class="search-warp">
            <a-form
              ref={formRef.value}
              {...props}
              model={model}
              {...FormLayout}
            >
              {/* <a-row class="search-warp" gutter={48}> */}
              <FormItem columns={columns} isCollapsed={collapsed.value} />
              {slots.btn ? (
                slots.btn({ onSubmit })
              ) : (
                <SearchBtn
                  resetFields={resetFields}
                  onSubmit={onSubmit}
                  handleClickTriggerSearchBar={handleClickTriggerSearchBar}
                  isShowColspan={props.isShowColspan}
                  collapsed={collapsed}
                />
              )}
              {/* </a-row> */}
            </a-form>
          </section>
        )
      );
    };
  },
});
