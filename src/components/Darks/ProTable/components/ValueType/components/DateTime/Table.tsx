import moment from "moment";

export default ({ text }: any) => {
  const _text = moment(text).format("YYYY-MM-DD hh:mm:ss");
  return <span>{_text || "-"}</span>;
};
