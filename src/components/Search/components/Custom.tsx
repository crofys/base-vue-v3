import { IFormItemProps } from "../interface";

export const Custom = (props: IFormItemProps) => {
  const { value, onChange, render: RenderCustom } = props;
  if (typeof RenderCustom !== "function") {
    throw new Error("需要传入 render 函数！！！");
  }
  return <RenderCustom value={value} onChange={onChange} />;
};
