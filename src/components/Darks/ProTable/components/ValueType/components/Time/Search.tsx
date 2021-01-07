import { IFormItemProps } from "../../../../types";

export default (props: IFormItemProps) => {
  const { placeholder } = props;
  const _placeholder = placeholder || `请选择${props.title}`;

  return (
    <a-time-picker
      {...props}
      style={{ width: "100%" }}
      placeholder={_placeholder}
    />
  );
};
