export default (text: string, { valueEnum }: any) => {
  const { label } = valueEnum.find((_val: any) => _val.value === text) || {};
  return label;
};
