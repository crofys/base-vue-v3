import moment, { Moment } from "moment";
import { IFormItemProps } from "../../../types";
import { computed } from "vue";

const Search = (props: IFormItemProps) => {
  const { value, change, placeholder } = props;
  const _placeholder = placeholder || `请选择${props.title}`;

  const _value = computed(() => {
    return value;
  });
  const _handleChange = (time: Moment) => {
    // if (format) {
    //   if (format === "timestamp") {
    //     time = time.valueOf() as any;
    //   } else {
    //     time = time.format(format) as any;
    //   }
    // }
    change(time);
  };
  return (
    <a-time-picker
      style={{ width: "100%" }}
      value={_value.value}
      onChange={_handleChange}
      placeholder={_placeholder}
    />
  );
};

export default {
  Search,
  Table({ text }: any) {
    const _text = moment(text).format("hh:mm:ss");
    return <span>{_text}</span>;
  },
};
