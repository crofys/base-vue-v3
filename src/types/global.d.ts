import { App } from "vue";
import { TConfigOption } from "../common/core/types/config.d";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $config: TConfigOption;
  }
}
