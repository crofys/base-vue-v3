import moment from "moment";

export default ({ text }: any) => {
  const _text = moment(text).format("YYYY-MM-DD");
  return <span>{_text || "-"}</span>;
};
