const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./packages/client/src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index_bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  target: ["web", "es5"],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          rootMode: "upward",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./packages/client/public/index.html",
    }),
  ],
};
