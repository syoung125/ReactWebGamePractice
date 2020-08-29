const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development", // 개발자: development, 실서비스: production
  devtool: "eval", // 보통 개발자: eval, production: hidden-sourch-map
  resolve: {
    extensions: [".jsx", ".js"],
  },
  // webpack 메인: entry, moduel, output
  entry: {
    app: "./client",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader", // entry에 babel-loader를 적용하는거
        options: {
          // babel-loader에 대한 option들
          // persets: plugins의 모음
          presets: [
            [
              "@babel/preset-env",
              {
                // preset-env에 대한 option설정
                // ex) targets.browsers -> 원하는 browser에만 맞춰서 바꿀수 있음
                // 참고) 브라우저 리스트 볼수있음: https://github.com/browserslist/browserslist
                targets: {
                  browsers: ["> 1% in KR"],
                },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: [],
        },
      },
    ],
  },
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true })], // plugin: 확장프로그램
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
  },
};

/*
Webpack 공식문서 확인하기 
https://webpack.js.org/concepts/
*/
