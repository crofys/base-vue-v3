import moment, { Moment } from "moment";
import { IFormItemProps } from "../../../types";
import { computed } from "vue";

const Table = ({ text }: any) => {
  const _text = moment(text).format("YYYY-MM-DD");
  return <span>{_text || "-"}</span>;
};

const Search = (props: IFormItemProps) => {
  const { value, change, valueProp, format = "YYYY-MM-DD" } = props;

  const _value = computed(() => {
    let _val = value || [];
    if (typeof value === "string") {
      _val = value.split(",");
    }
    const [starTime, endTime] = _val;

    return value && value.length ? [moment(starTime), moment(endTime)] : [];
  });
  const _handleChange = (time: Moment[]) => {
    let _time: any[] = [];
    if (format) {
      const [starTime, endTime] = time;
      if (format === "timestamp") {
        _time = [starTime.valueOf(), endTime.valueOf()];
      } else {
        _time = [starTime.format(format), endTime.format(format)];
      }
    }
    change(_time);
  };
  return (
    <a-range-picker
      value={_value.value}
      onChange={_handleChange}
      {...valueProp}
    />
  );
};

export default {
  Table,
  Search,
};
