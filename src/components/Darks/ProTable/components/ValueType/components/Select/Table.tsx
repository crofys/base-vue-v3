export default ({ text }: any, { props }: any) => () => {
  const { label } =
    props.valueEnum.find((item: any) => item.value === text) || {};
  return <div>{label || ""}</div>;
};
