import moment, { Moment } from "moment";
import { IFormItemProps } from "../../../types";
import { computed } from "vue";

const Table = ({ text }: any) => {
  const _text = moment(text).format("YYYY-MM-DD");
  return <span>{_text || "-"}</span>;
};

const Search = (props: IFormItemProps) => {
  const { value, change, placeholder, format = "YYYY-MM-DD" } = props;
  const _placeholder = placeholder || `请选择${props.title}`;

  const _value = computed(() => {
    return value ? moment(value) : value;
  });
  const _handleChange = (time: Moment) => {
    if (format) {
      if (format === "timestamp") {
        time = time.valueOf() as any;
      } else {
        time = time.format(format) as any;
      }
    }
    change(time);
  };
  return (
    <a-date-picker
      style={{ width: "100%" }}
      value={_value.value}
      onChange={_handleChange}
      placeholder={_placeholder}
    />
  );
};

export default {
  Table,
  Search,
};
