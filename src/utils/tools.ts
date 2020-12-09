export const DownLoad = (url: string) => {
  try {
    const aNode = document.createElement("a");
    aNode.setAttribute("href", url);
    document.body.appendChild(aNode);
    aNode.click();
  } catch (error) {
    console.log(error);
  }
};
