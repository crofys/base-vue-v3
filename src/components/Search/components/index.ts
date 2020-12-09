import { Input } from "./Input";
import { Select } from "./Select";
import { DatePicker } from "./Date";
import { Custom } from "./Custom";

export type TFormItemValueType = "input" | "select" | "date" | "custom";

export default {
  input: Input,
  select: Select,
  date: DatePicker,
  custom: Custom,
};
