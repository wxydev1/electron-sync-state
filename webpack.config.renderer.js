const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "renderer/main.tsx"),
    child: path.resolve(__dirname, "renderer/child.tsx"),
  },
  target: "electron-renderer",
  output: {
    path: path.join(__dirname, "dist/renderer"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css", ".json"],
  },
  module: {
    rules: [
      {
        test: [/\.tsx$/, /\.ts$/, /\.js$/],
        loader: "ts-loader",
        exclude: [/node_modules/],
        options: {
          configFile: path.resolve(__dirname, "renderer/tsconfig.json"),
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: `main.html`,
      chunks: ["main"],
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new HtmlWebpackPlugin({
      filename: `child.html`,
      chunks: ["child"],
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
};
