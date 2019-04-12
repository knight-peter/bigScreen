const webpack = require("webpack");
module.exports = {
  lintOnSave: false,
  // 基本路径
  publicPath: "./",
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      })
    ]
  }
};
