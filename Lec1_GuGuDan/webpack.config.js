const path = require("path");
const webpack = require("webpack");
// process.env.NODE_ENV = "production"; // 배포모드로 바꿀시 이 코드 추가, mode -> production으로

module.exports = {
  mode: "development", // 개발자: development, 실서비스: production
  devtool: "eval", // 보통 개발자: eval, production: hidden-sourch-map
  resolve: {
    extensions: [".jsx", ".js"], // entry.app에 확장자를 안써도 되게 됨
  },
  // webpack 메인: entry, moduel, output
  entry: {
    app: ["./client"],
  }, // 입력
  module: {
    rules: [
      {
        test: /\.jsx?$/, // js파일과 jsx파일에 rule을 적용하겠다
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
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "react-hot-loader/babel",
          ],
        },
      },
    ],
  },
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true })], // plugin: 확장프로그램
  output: {
    path: path.join(__dirname, "dist"), //__dirname: 현재 폴더 -> 현재 폴더 안의 dist
    filename: "app.js",
  }, // 출력
};

/*
Webpack 공식문서 확인하기 
https://webpack.js.org/concepts/
*/

/*
webpack이라는 명령어를 치면 여기있는 entry를 읽어서 
app.js(output.filename)라는 한 파일르 만들어줌 
(webpack 명령어가 안먹히면 -> npx webpack)
*/
