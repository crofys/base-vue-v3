import { IFormItemProps } from "../../../../types";

export default (props: IFormItemProps) => () => {
  const { placeholder } = props;
  const _placeholder = placeholder || `请选择${props.title}`;

  return <a-date-picker {...props} placeholder={_placeholder} />;
};
