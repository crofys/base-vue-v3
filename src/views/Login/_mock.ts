import { GET_MARKET_DATA_LIST } from "./service";

export default {
  [`GET ${GET_MARKET_DATA_LIST}`]: (ctx: any) => {
    return ctx.result([
      {
        "id|+1": 1,
        "province|1": "@province",
        "brand|1": ["total", "海信", "创维", "TCL", "长虹", "康佳"],
        "brandType|1": [
          "全部品牌",
          "传统5大厂商",
          "互联网电视",
          "外资品牌",
          "其他品牌",
        ],
        "accumulativeTotalSales|1000-10000": 1000,
        "monthSales|1000-10000": 1000,
      },
    ]);
  },
};
