import { defineComponent, ref, watchEffect } from "vue";
import Preview from "./Preview";
import MonacoEditor from "../../components/MonacoEditor/index";

export default defineComponent({
  setup() {
    const editorState = ref(
      JSON.stringify(
        {
          a: 1,
        },
        null,
        2,
      ),
    );

    watchEffect(() => {
      console.log(editorState.value, "============");
    });

    return () => {
      return (
        <div>
          首页
          <Preview />
          <MonacoEditor v-model={editorState.value} />
        </div>
      );
    };
  },
});
