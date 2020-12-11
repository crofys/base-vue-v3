import { UpOutlined, DownOutlined } from "@ant-design/icons-vue";
import "./index.less";

export default (props: any) => {
  const {
    onSubmit,
    resetFields,
    handleClickTriggerSearchBar,
    isShowColspan,
    collapsed,
  } = props;
  return (
    <a-col>
      <a-space
        size={10}
        style={{ display: "flex", "justify-content": "flex-end" }}
      >
        <a-button type="primary" onClick={onSubmit}>
          确定
        </a-button>
        <a-button type="primary" onClick={resetFields}>
          重置
        </a-button>
        <a-button type="link" onClick={handleClickTriggerSearchBar}>
          {isShowColspan &&
            (collapsed ? (
              <>
                收起
                <UpOutlined />
              </>
            ) : (
              <>
                展开
                <DownOutlined />
              </>
            ))}
        </a-button>
      </a-space>
    </a-col>
  );
};
