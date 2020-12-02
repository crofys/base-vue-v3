const createJudgeTypesFactory = <T>(type: string) => (o: any): o is T =>
  o && Object.prototype.toString.call(o) === `[object ${type}]`;

export const isRegExp = createJudgeTypesFactory<RegExp>("RegExp");
export const isNull = createJudgeTypesFactory<null>("Null");
export const isObject = createJudgeTypesFactory<object>("Object");
export const isBoolean = createJudgeTypesFactory<boolean>("Boolean");
export const isNumber = createJudgeTypesFactory<number>("Number");
export const isUndefined = createJudgeTypesFactory<undefined>("Undefined");
export const isFunction = createJudgeTypesFactory<Function>("Function");
export const isString = createJudgeTypesFactory<string>("String");
export const isPromise = createJudgeTypesFactory<Promise<any>>("RegExp");
export const isArray = createJudgeTypesFactory<any[]>("Array");
export const isDate = createJudgeTypesFactory<Date>("Date");
export const isDocument = createJudgeTypesFactory<HTMLDocument>("HTMLDocument");
export const isError = createJudgeTypesFactory<Error>("Error");
