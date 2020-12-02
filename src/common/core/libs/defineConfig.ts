import { merge } from "lodash";
import { TConfigOption } from "../types/config.d";

const initState: TConfigOption = {
  title: "",
  name: "",
  menus: {
    theme: "dark",
  },
  iconUrl: "",
};
export const defineConfig = (option: TConfigOption) => {
  return merge(initState, option);
};
