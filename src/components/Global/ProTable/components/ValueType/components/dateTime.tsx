import moment, { Moment } from "moment";
import { IFormItemProps } from "../../../types";
import { computed } from "vue";

const Search = (props: IFormItemProps) => {
  const {
    value,
    change,
    valueProp,
    placeholder,
    format = "YYYY-MM-DD hh:mm:ss",
  } = props;
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
      showTime
      value={_value.value}
      onChange={_handleChange}
      {...valueProp}
      placeholder={_placeholder}
    />
  );
};

export default {
  Search,
  Table({ text }: any) {
    const _text = moment(text).format("YYYY-MM-DD hh:mm:ss");
    return <span>{_text || "-"}</span>;
  },
};
