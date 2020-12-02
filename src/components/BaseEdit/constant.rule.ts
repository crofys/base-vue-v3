interface IRuleConstant {
  phone: RegExp;
  phoneStrict: RegExp;
  phoneTel: RegExp;
  email: RegExp;
  password: RegExp;
  idCard: RegExp;
  url: RegExp;
  num: RegExp;
  numAndLetter: RegExp;
  letter: RegExp;
  lowerCaseLetter: RegExp;
  capitalLetters: RegExp;
  cn: RegExp;
  cnName: RegExp;
  enName: RegExp;
}

export type TRuleType = keyof IRuleConstant;

/**
 * @namespace RULES_CONSTANT
 * @property {regexp} phone             - 手机号(3,14,15,16,17,18,19开头)
 * @property {regexp} phoneStrict       - 手机号(严谨)
 * @property {regexp} phoneTel          - 座机(中国)
 * @property {regexp} password          - 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字
 * @property {regexp} email             - 邮箱
 * @property {regexp} idCard            - 身份证
 * @property {regexp} url               - URL地址
 * @property {regexp} num               - 数字
 * @property {regexp} numAndLetter      - 数字 + 字母
 * @property {regexp} letter            - 大小写字母
 * @property {regexp} lowerCaseLetter   - 小写字母
 * @property {regexp} capitalLetters    - 大写字母
 * @property {regexp} cn                - 中文
 * @property {regexp} cnName            - 中文名
 * @property {regexp} enName            - 英文名
 */
export const RULES_CONSTANT: IRuleConstant = {
  phone: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
  phoneStrict: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,
  phoneTel: /^\d{3}-\d{8}$|^\d{4}-\d{7,8}$/,
  password: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/,
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  idCard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  url: /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,
  cn: /[\u4E00-\u9FA5]/,
  num: /^\d{1,}$/,
  numAndLetter: /^[A-Za-z0-9]+$/,
  letter: /^[a-zA-Z]+$/,
  lowerCaseLetter: /^[a-z]+$/,
  capitalLetters: /^[A-Z]+$/,
  cnName: /^(?:[\u4e00-\u9fa5·]{2,16})$/,
  enName: /(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/,
};
