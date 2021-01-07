export default ({ index }: any, { params }: any) => {
  const { value } = params;
  return <span>{index + 1 + (value?.page - 1) * value?.pageSize}</span>;
};
