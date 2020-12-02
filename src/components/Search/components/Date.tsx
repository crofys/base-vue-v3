import { IFormItemProps } from "../interface";
import moment, { Moment } from "moment";
import { computed } from "vue";

export const DatePicker = (props: IFormItemProps) => {
  const { value, change, valueProp, placeholder, format } = props;
  const _placeholder = placeholder || `请选择${props.label}`;

  const _value = computed(() => {
    console.log(value ? moment(value) : value, "====value");
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
      value={_value.value}
      onChange={_handleChange}
      {...valueProp}
      placeholder={_placeholder}
    />
  );
};
