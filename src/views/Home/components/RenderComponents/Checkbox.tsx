export default (props: any) => () => (
  <a-checkbox-group {...props}>
    <a-row>
      {props?.options?.map((option: any) => (
        <a-col span={option.span}>
          <a-checkbox value={option.value}>{option.label}</a-checkbox>
        </a-col>
      ))}
    </a-row>
  </a-checkbox-group>
);
