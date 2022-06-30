const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const commonConfiguration = require("./webpack.common.js");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(commonConfiguration, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    new TerserPlugin({
      terserOptions: {
        sourceMap: true,
        // minimize: true,
      },
      minify: TerserPlugin.uglifyJsMinify,
    }),
  ],
});
