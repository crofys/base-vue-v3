type TUseDownload = (
  fn: (parma?: any) => Promise<any> | string,
  option?: {
    fileName?: string;
    onCompleteLinkNode?: (linkNode?: any) => void;
    onSuccess?: (res: any) => void;
    onError?: (res: any) => void;
  },
) => {
  run: () => Promise<void>;
};
export const useDownload: TUseDownload = (fn, options) => {
  const { fileName = "xxxxx.xls", onSuccess, onError, onCompleteLinkNode } =
    options || {};

  // 创建Node节点
  const creatLineNode = () => {
    const linkNode: any = document.createElement("a");
    return linkNode;
  };

  // 修改Node节点
  const updateLinkNode = (linkNode: any) => {
    linkNode.style.display = "none";
    onCompleteLinkNode && onCompleteLinkNode(linkNode);
  };

  // 设置文件名
  const setFilName = (linkNode: any, name: string) => {
    const fileName: string = name;
    //a标签的download属性规定下载文件的名称
    linkNode.download = fileName;
  };

  // 设置下载链接
  const setLinkNodeHref = (linkNode: any, url: any) => {
    const type = typeof url;
    linkNode.href = type === "string" ? url : URL.createObjectURL(url); //生成一个Blob URL
    document.body.appendChild(linkNode);
    linkNode.click(); //模拟在按钮上的一次鼠标单击
    URL.revokeObjectURL(linkNode.href); // 释放URL 对象
    document.body.removeChild(linkNode);
  };

  const run = async () => {
    try {
      // 文件名
      const res = await fn();
      const linkNode = creatLineNode();
      updateLinkNode(linkNode);
      setFilName(linkNode, fileName);
      setLinkNodeHref(linkNode, res);
      onSuccess && onSuccess(res);
    } catch (error) {
      console.log("接口请求失败：", error);
      onError && onError(error);
    }
  };
  return {
    run,
  };
};
