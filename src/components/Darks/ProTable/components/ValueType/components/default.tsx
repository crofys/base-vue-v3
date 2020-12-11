import { IFormItemProps } from "../../../types";

export const Search = (props: IFormItemProps) => {
  const { value, width = "100%", change, placeholder, valueProp } = props;
  const _placeholder = placeholder || `请输入${props.title}`;
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
export const Table = ({ text }: any) => {
  return text;
};

export default {
  Search,
  Table,
};
