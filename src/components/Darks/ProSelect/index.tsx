interface ISelectProps {
  options: any[];
  valueKey: string; // option value key
  labelKey: string; // option label key
  [item: string]: any;
}
export default (props: ISelectProps) => {
  const {
    width = "150px",
    options,
    valueKey = "value",
    labelKey = "label",
    ..._props
  } = props;
  return (
    <a-select {..._props} style={{ minWidth: width }}>
      {options?.map((option: any) => (
        <a-select-option
          key={option[valueKey]}
          value={option[valueKey]}
          {...option}
        >
          {option[labelKey]}
        </a-select-option>
      ))}
    </a-select>
  );
};
