import { IFormItemProps } from "../../../../types";

export default (props: IFormItemProps) => () => {
  return <a-range-picker {...props} />;
};
