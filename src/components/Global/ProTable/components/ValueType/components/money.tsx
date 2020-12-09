import { Search } from "./default";

export default {
  Search,
  Table({ text }: any) {
    return <span>¥{text || "-"}</span>;
  },
};
