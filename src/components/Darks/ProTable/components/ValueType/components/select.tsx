import { IFormItemProps } from "../../../types";

export const Search = (props: IFormItemProps) => {
  const {
    value,
    change,
    placeholder,
    valueEnum,
    valueProp,
    width = "150px",
  } = props;
  const _placeholder = placeholder || `请选择${props.title}`;
  return (
    <a-select
      value={value}
      onChange={change}
      {...valueProp}
      placeholder={_placeholder}
      style={{ minWidth: width }}
    >
      {valueEnum?.map(({ value, label, ...options }: any) => (
        <a-select-option key={value} value={value} {...options}>
          {label}
        </a-select-option>
      ))}
    </a-select>
  );
};
export const Table = ({ text }: any, { props }: any) => {
  const { label } =
    props.valueEnum.find((item: any) => item.value === text) || {};
  return <div>{label || ""}</div>;
};

export default {
  Search,
  Table,
};
