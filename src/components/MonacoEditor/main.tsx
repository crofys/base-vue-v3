import { defineComponent, ref, onMounted, watch, PropType } from "vue";
import * as monaco from "monaco-editor";

import "./style.less";

export default defineComponent({
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Object as PropType<
        monaco.editor.IStandaloneEditorConstructionOptions
      >,
      required: false,
      default: () => ({
        language: "json", //语言支持自行查阅demo
        automaticLayout: true, //自动布局
        theme: "vs-dark", //官方自带三种主题vs, hc-black, or vs-dark
        selectOnLineNumbers: true, //显示行号
        roundedSelection: false,
        readOnly: false, // 只读
        cursorStyle: "line", //光标样式
        glyphMargin: true, //字形边缘
        useTabStops: false,
        fontSize: 16, //字体大小
        quickSuggestionsDelay: 500, //代码提示延时
      }),
    },
  },
  setup(props, { emit }) {
    const editorRef = ref();
    let editorInstance: monaco.editor.IStandaloneCodeEditor;

    watch(
      () => props.modelValue,
      (val = "") => {
        try {
          const currentVal = editorInstance?.getValue();
          if (currentVal !== val) {
            editorInstance?.setValue(val);
          }
        } catch (error) {
          console.warn(error);
        }
      },
    );
    watch(
      () => props.options,
      val => {
        if (val) {
          editorInstance.updateOptions(val);
        }
      },
    );
    onMounted(() => {
      editorInstance = monaco.editor.create(
        editorRef.value as HTMLElement,
        props.options,
      );
      if (props.modelValue) {
        editorInstance.setValue(props.modelValue);
      }
      editorInstance.onDidChangeModelContent(ev => {
        emit("update:modelValue", editorInstance.getValue(), ev);
      });
    });

    return () => <div ref={editorRef} class="monaco-editor" />;
  },
});
