import { IFormItemProps } from "../interface";

export const Input = (props: IFormItemProps) => {
  const { value, width = "170px", change, placeholder, valueProp } = props;
  const _placeholder = placeholder || `请输入${props.label}`;
  return (
    <a-input
      value={value}
      onChange={(e: any) => change(e.target.value)}
      {...valueProp}
      style={{ width: width }}
      placeholder={_placeholder}
    />
  );
};
