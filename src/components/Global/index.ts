import ProTable from "./ProTable";
import ModalForm from "./ModalForm";
import ProSelect from "./ProSelect";
import ProRadio from "./ProRadio";
import ProEllipsis from "./Ellipsis";
import ProDetail from "./ProDetail";

import { createFromIconfontCN } from "@ant-design/icons-vue";
import Config from "@/config/config";

const IconFont = createFromIconfontCN({
  scriptUrl: Config.iconUrl,
});

export const GlobalComponents = [
  {
    name: "ProTable",
    component: ProTable,
  },
  {
    name: "ModalForm",
    component: ModalForm,
  },
  {
    name: "ProSelect",
    component: ProSelect,
  },
  {
    name: "ProDetail",
    component: ProDetail,
  },
  {
    name: "ProRadio",
    component: ProRadio,
  },
  {
    name: "ProEllipsis",
    component: ProEllipsis,
  },
  {
    name: "IconFont",
    component: IconFont,
  },
];
