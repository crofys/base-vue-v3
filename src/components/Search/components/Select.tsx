import { IFormItemProps } from "../interface";

export const Select = (props: IFormItemProps) => {
  const {
    value,
    change,
    placeholder,
    valueEnum,
    valueProp,
    width = "150px",
  } = props;
  const _placeholder = placeholder || `请选择${props.label}`;
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
