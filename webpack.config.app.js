const path = require("path");
module.exports = {
  entry: path.resolve(__dirname, "app/index.ts"),
  target: "electron-main",
  module: {
    rules: [
      {
        test: [/\.tsx$/, /\.ts$/],
        loader: "ts-loader",
        exclude: [/node_modules/],
        options: {
          configFile: path.resolve(__dirname, "app/tsconfig.json"),
        },
      },
    ],
  },
  output: {
    path: path.join(__dirname, "dist/app"),
  },
};
