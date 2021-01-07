import { IFormItemProps } from "../../../../types";
export default (props: IFormItemProps) => () => {
  const { placeholder, width = "150px" } = props;
  const _placeholder = placeholder || `请选择${props.title}`;
  return (
    <a-select {...props} placeholder={_placeholder} style={{ minWidth: width }}>
      {props?.valueEnum?.map((option: any) => (
        <a-select-option key={option.label} value={option.value}>
          {option.label}
        </a-select-option>
      ))}
    </a-select>
  );
};
