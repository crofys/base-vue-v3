import { reactive } from "vue";
import { RULES_CONSTANT, TRuleType } from "./constant.rule";

type TRuleItem = {
  ruleType?: TRuleType;
  [x: string]: any;
};
type TRules = {
  [x: string]: Array<TRuleItem>;
};

type TUseRules = (rules: TRules) => any[];

export const useRules: TUseRules = (rules: TRules) => {
  const ruleRef: any = reactive({});
  for (const key in rules) {
    const _tempRule: any[] = [];
    rules[key].map((rule: TRuleItem) => {
      if (rule.ruleType) {
        Object.assign(rule, {
          pattern: RULES_CONSTANT[rule.ruleType],
        });
      }
      _tempRule.push(rule);
    });
    console.log(_tempRule);
    ruleRef[key] = _tempRule;
  }
  return ruleRef;
};
