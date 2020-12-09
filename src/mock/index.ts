import { Mock, Result } from "./utils";
import MockMarkData from "./modules/mark-data/index";

const mocks = Object.assign({}, MockMarkData);

if (process.env.VUE_APP_ENV === "development") {
  for (const key in mocks) {
    const [method, url] = key.split(" ");
    const _mockMethod = method.toLocaleLowerCase() || "get";
    const _template = (mocks[key] as any)({ result: Result });

    Mock[_mockMethod](url, _template);
  }
}
