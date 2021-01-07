const path = require("path");
// const DefineConfig = require("/Users/xuchangjian/workspace/Plugins/WebpackPlugin/lib/index.cjs");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  outputDir: "dist",
  // publicPath: './',
  // assetsDir: 'static',
  pages: {
    app: {
      entry: path.resolve(__dirname, "./src/main.ts"),
      // 模板来源
      template: path.resolve(__dirname, "./public/index.html"),
      filename: "index.html",
      title: process.env.TITLE,
      chunks: ["chunk-vendors", "chunk-common", "app"],
    },
  },
  // lintOnSave: false, // 是否开启Eslint
  productionSourceMap: true,
  devServer: {
    port: process.env.PORT,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/less/*.less")],
    },
  },
  css: {
    loaderOptions: {
      // sass: {
      //   data: `@import "@css/variables.scss";`,
      // },
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  // webpack-merge 合并到最终的配置中
  configureWebpack: {
    resolve: {
      extensions: [".js", ".ts", ".vue", ".json", ".tsx"],
      alias: {
        "@dark": path.resolve(__dirname, "src/.dark/"),
      },
    },
    plugins: [new MonacoWebpackPlugin()],
  },
};
