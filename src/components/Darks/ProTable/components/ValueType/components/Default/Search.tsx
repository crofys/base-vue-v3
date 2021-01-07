import { IFormItemProps } from "../../../../types";

export default (props: IFormItemProps) => () => {
  const { width = "100%", placeholder } = props;
  const _placeholder = placeholder || `请输入${props.title}`;
  return (
    <a-input {...props} style={{ width: width }} placeholder={_placeholder} />
  );
};
