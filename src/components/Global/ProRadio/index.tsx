interface IRadioProps {
  options: any[];
  valueKey: string; // option value key
  labelKey: string; // option label key
  [item: string]: any;
}
export default (props: IRadioProps) => {
  const { options, valueKey = "value", labelKey = "label", ..._props } = props;
  return (
    <a-radio-group {..._props}>
      {options?.map((option: any) => (
        <a-radio key={option[valueKey]} value={option[valueKey]} {...option}>
          {option[labelKey]}
        </a-radio>
      ))}
    </a-radio-group>
  );
};
