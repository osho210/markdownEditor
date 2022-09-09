const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  module: {
    //ビルド時に追加で行う処理
    rules: [
      {
        //拡張子がtsの場合ts-loaderを実行する
        test: /\.tsx$/,
        use: "ts-loader",
        //除外するファイル
        exclude: /node_modules/,
      },
    ],
  },
  //解決するファイルの拡張子
  resolve: {
    //tsx = ts + jsx を使用できる
    extensions: [".js", ".ts", "tsx"],
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    publicPath: "dist/",
  },

  devServer: {
    hot: true,
    open: true,
  },
};
