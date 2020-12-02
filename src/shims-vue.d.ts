// import { TConfigOption } from "@/common/core/types/config.d";
declare module "*.vue" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}
declare module "ant-design-vue/es/locale/zh_CN";

// declare module "@vue/runtime-core" {
//   interface ComponentCustomProperties {
//     $config: any;
//   }
// }
