export default (props: any) => () => (
  <a-select {...props}>
    {props?.options?.map((option: any) => (
      <a-select-option key={option.label} value={option.value}>
        {option.label}
      </a-select-option>
    ))}
  </a-select>
);
